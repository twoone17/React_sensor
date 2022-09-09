import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

function Header() {
  const [connected, setConnect] = useState(true);
  const [Disconnected, setDisConnect] = useState(true);
  const [device, setDevice] = useState("");
  const [Xangle, setXangle] = useState("");
  const [Yangle, setYangle] = useState("");
  const [state1, setState1] = useState("허리가 평균보다 8도 굽어있어요"); //상태
  const [state2, setState2] = useState("허리를 피고 앉아봐요!"); //조언
  const [StartTimeState, setStartTimeState] = useState(""); //시간
  const [EndTimeState, setEndTimeState] = useState(""); //시간
  const [TotalTimeState, setTotalTimeState] = useState("");

  let disConnection = false;
  let ConvertedTotalTime = 0;
  let CCount = 0;
  const buffer = [];
  let StartTime = 0;
  let EndTime = 0;
  let TotalTime = 0;
  let ConvertedStartTime = 0;
  let ConvertedEndTime = 0;
  let bluetoothDevice;
  let EndTimeByGetTime = 0;
  let StartTimeByGetTime = 0;
  const [startButton, setStartButton] = useState(false);
  async function onClickBluetooth() {
    try {
      const deviceActivate = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["66df5109-edde-4f8a-a5e1-02e02a69cbd5"],
      });
      bluetoothDevice = deviceActivate;
      StartTime = Date.now();
      let Startdate = new Date(StartTime);
      StartTimeByGetTime = Startdate.getTime();
      ConvertedStartTime = timeConvert(StartTime);
      console.log(ConvertedStartTime);
      setConnect(false);
      setDevice(deviceActivate);
      setStartTimeState(ConvertedStartTime);
      console.log("Connecting to GATT Server...");
      bluetoothDevice.addEventListener(
        "gattserverdisconnected",
        onDisconnected
      );
      connect();
      const server = await bluetoothDevice.gatt.connect();

      //Service
      const service = await server.getPrimaryService(
        "66df5109-edde-4f8a-a5e1-02e02a69cbd5"
      );

      //X sensor characteristic
      const characteristic = await service.getCharacteristic(
        "741c12b9-e13c-4992-8a5e-fce46dec0bff"
      );

      //Y sensor characteristic
      const characteristic2 = await service.getCharacteristic(
        "baad41b2-f12e-4322-9ba6-22cd9ce09832"
      );

      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleXangleChanged
      );

      characteristic2.addEventListener(
        "characteristicvaluechanged",
        handleYangleChanged
      );
      const interval = setInterval(() => {
        bluetoothDevice.addEventListener(
          "gattserverdisconnected",
          onDisconnected
        );
        console.log(disConnection);
        if (disConnection) {
          clearInterval(interval);
          console.log("disconnection 접근");
          console.log("시작 시간 : " + ConvertedStartTime);
          console.log("종료 시간 : " + ConvertedEndTime);
          console.log("Total time은? : " + TotalTime);
          disConnection = false;
          connect();
        }
        CCount++;
        const Xvalue = characteristic.readValue();
        const Yvalue = characteristic2.readValue();
        console.log("this is interval" + CCount);
      }, 1000);
    } catch (error) {
      console.log("Argh! " + error);
    }
  }

  function hex2a(hexx) {
    let hex = hexx.toString(); //force conversion
    let str = "";
    for (let i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  function handleXangleChanged(event) {
    const length = event.target.value.byteLength;
    for (let i = 0; i < length; i++) {
      buffer[i] = event.target.value.getUint8(i).toString(16);
    }
    const bufferMerge = buffer.join("");
    const Xanglevalue = hex2a(bufferMerge);
    setXangle(Xanglevalue);
    if (CCount % 10) {
      localStorage.setItem(CCount, Xanglevalue);
    }
    console.log("Xangle" + Xanglevalue);
  }

  function handleYangleChanged(event) {
    const length = event.target.value.byteLength;
    for (let i = 0; i < length; i++) {
      buffer[i] = event.target.value.getUint8(i).toString(16);
    }
    const bufferMerge = buffer.join("");
    const Yanglevalue = hex2a(bufferMerge);

    setYangle(Yanglevalue);
    localStorage.setItem(CCount, Yanglevalue);
    console.log("Yangle" + Yanglevalue);
  }

  async function connect() {
    exponentialBackoff(
      3 /* max retries */,
      2 /* seconds delay */,
      async function toTry() {
        time("Connecting to Bluetooth Device... ");
        await bluetoothDevice.gatt.connect();
      },
      function success() {
        console.log("> Bluetooth Device connected. Try disconnect it now.");
      },
      function fail() {
        time("Failed to reconnect.");
      }
    );
  }

  async function onDisconnected() {
    console.log(ConvertedStartTime);
    disConnection = true;
    setDisConnect(false);
    EndTime = Date.now();
    let EndDate = new Date(EndTime);
    EndTimeByGetTime = EndDate.getTime();
    ConvertedEndTime = timeConvert(EndTime);
    TotalTime = (EndTimeByGetTime - StartTimeByGetTime) / 1000;
    setEndTimeState(ConvertedEndTime);
    setTotalTimeState(TotalTime);
    await device.gatt.disconnect();
  }

  /* Utils */

  // This function keeps calling "toTry" until promise resolves or has
  // retried "max" number of times. First retry has a delay of "delay" seconds.
  // "success" is called upon success.
  async function exponentialBackoff(max, delay, toTry, success, fail) {
    try {
      const result = await toTry();
      success(result);
    } catch (error) {
      if (max === 0) {
        return fail();
      }
      time("Retrying in " + delay + "s... (" + max + " tries left)");
      setTimeout(function () {
        exponentialBackoff(--max, delay * 2, toTry, success, fail);
      }, delay * 1000);
    }
  }

  function time(text) {
    console.log("[" + new Date().toJSON().substr(11, 8) + "] " + text);
  }

  function timeConvert(time) {
    let date = new Date(time);
    let year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    let day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    let hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    let minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    let second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

    let returnDate =
      year +
      "." +
      month +
      "." +
      day +
      ". " +
      hour +
      ":" +
      minute +
      ":" +
      second;
    return returnDate;
  }

  return (
    <div>
      <div className={styles.row}>
        <button onClick={onClickBluetooth}>Click to connect bluetooth</button>
        {connected ? (
          <h4>Device Loading...</h4>
        ) : (
          <h4>Device name : {device.name}</h4>
        )}
        <br></br>
        <div className={styles.container}>
          <h2 className={styles.xy}>XAngle : {Xangle} </h2>
          <br></br>
          <h2 className={styles.xy}>YAngle : {Yangle} </h2>
        </div>
        <div>
          <h3 className={styles.s1}>{state1}</h3>
          <p className={styles.s2}>{state2}</p>
          {connected ? (
            <p>기기를 연결해서 측정을 시작해보세요 ! </p>
          ) : (
            <p>시작시간 : {StartTimeState}</p>
          )}
          {Disconnected ? "" : <p>종료시간 : {EndTimeState}</p>}
          {Disconnected ? "" : <p>총 경과 시간 : {TotalTimeState}</p>}
        </div>
      </div>
    </div>
  );
}
export default Header;
