import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

function Header() {
  const [connect, setConnect] = useState(true);
  const [device, setDevice] = useState("");
  const [Xangle, setXangle] = useState("");
  const [Yangle, setYangle] = useState("");
  const [state1, setState1] = useState("허리가 평균보다 8도 굽어있어요"); //상태
  const [state2, setState2] = useState("허리를 피고 앉아봐요!"); //조언
  const [count, setCount] = useState(0);
  let CCount = 0;
  const buffer = [];
  const [startButton, setStartButton] = useState(false);
  async function onClickBluetooth() {
    try {
      const deviceActivate = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["66df5109-edde-4f8a-a5e1-02e02a69cbd5"],
      });
      setConnect(false);
      setDevice(deviceActivate);
      setCount((count) => count + 1);
      console.log("Connecting to GATT Server...");
      deviceActivate.addEventListener("gattserverdisconnected", onDisconnected);
      const server = await deviceActivate.gatt.connect();

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
      console.log("count" + count);
      setCount((count) => count + 1);

      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleXangleChanged
      );

      characteristic2.addEventListener(
        "characteristicvaluechanged",
        handleYangleChanged
      );
      setInterval(() => {
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

    setCount(count + 1);
    setYangle(Yanglevalue);
    localStorage.setItem(CCount, Yanglevalue);
    console.log("Yangle" + Yanglevalue);
  }

  //device 연결 해제 여부 확인
  function onDisconnected(event) {
    const device = event.target;
    console.log(`Device ${device.name} is disconnected.`);
  }

  return (
    <div>
      <div className={styles.row}>
        <button onClick={onClickBluetooth}>Click to connect bluetooth</button>
        {connect ? (
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
        </div>
      </div>
    </div>
  );
}
export default Header;
