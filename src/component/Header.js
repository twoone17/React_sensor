import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

function Header() {
  const [connected, setConnect] = useState(true); //연결 확인
  const [Disconnected, setDisConnect] = useState(true); //연결 해제 확인
  const [device, setDevice] = useState(""); //device의 정보 받기 : 이름 받는데 사용
  const [Xangle, setXangle] = useState(""); //Xangle 정보
  const [Yangle, setYangle] = useState(""); //Yangle 정보
  const [state1, setState1] = useState("자세가 정상적입니다"); //상태
  const [state2, setState2] = useState("이렇게만 유지하세요!"); //조언
  const [StartTimeState, setStartTimeState] = useState(""); //bluetooth 연결한 시작 시간
  const [EndTimeState, setEndTimeState] = useState(""); //bluetooth 연결해제된 종료 시간
  const [TotalTimeState, setTotalTimeState] = useState(""); //총 경과시간
  const [StorageData, setStorageData] = useState([
    {
      XTimeStorage: 0,
      YTimeStorage: 0,
      XVibrateStorage: 0,
      YVibrateStorage: 0,
      Duplicated: 0,
    },
  ]);
  let Xanglevalue = 0;
  let Yanglevalue = 0;
  const Storage = {
    XTimeStorage: 0,
    YTimeStorage: 0,
    XVibrateStorage: 0,
    YVibrateStorage: 0,
    Duplicated: 0,
    TotalTimeStorage: 0,
  };
  let Xboolean = false;
  let Yboolean = false;
  let XCount = 0;
  let YCount = 0;
  let disConnection = false;
  let ConvertedTotalTime = 0;
  let CCount = 0;
  const buffer = [];
  let StartTime = 0;
  let EndTime = 0;
  let TotalTime = 0;
  let ParsedStorage;
  let ConvertedStartTime = 0;
  let ConvertedEndTime = 0;
  let bluetoothDevice;
  let EndTimeByGetTime = 0;
  let StartTimeByGetTime = 0;

  const [startButton, setStartButton] = useState(false);
  async function onClickBluetooth() {
    //bluetooth 연결시 버튼
    try {
      //연결되는 장치 조건 필터링, 추후에 해당 기기만 연결되게 변경 예정
      const deviceActivate = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["66df5109-edde-4f8a-a5e1-02e02a69cbd5"], //기기 uuid
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
      const savedTime = localStorage.getItem(ConvertedStartTime);

      if (savedTime != null) {
        savedTime.forEach((item) => console.log(item));
      }

      console.log("Connecting to GATT Server...");
      bluetoothDevice.addEventListener(
        //초반 연결 해제 감지
        "gattserverdisconnected",
        onDisconnected
      );
      connect(); //자동 재연결 (작동 잘 안됨)
      const server = await bluetoothDevice.gatt.connect(); //서버에 연결

      //Service
      const service = await server.getPrimaryService(
        //서비스에 연결, 서비스에는 x와 y의 characteristic가 존재
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
        //X sensor 변화감지
        "characteristicvaluechanged",
        handleXangleChanged
      );

      characteristic2.addEventListener(
        //Y sensor 변화감지
        "characteristicvaluechanged",
        handleYangleChanged
      );
      const interval = setInterval(() => {
        //1초마다 interval
        bluetoothDevice.addEventListener(
          //연결 해제 감지
          "gattserverdisconnected",
          onDisconnected
        );

        if (disConnection) {
          //연결해제시 interval 종료
          clearInterval(interval);
          disConnection = false;
          connect(); //재연결 시도(작동잘안함)
        }
        CCount++;
        const Xvalue = characteristic.readValue(); //Xsensor 값 읽기 (이걸 포함해야 characteristicvaluechanged 의 EventListener가 먹힘)
        const Yvalue = characteristic2.readValue(); //Ysensor 값 읽기

        //handleXangleChanged , handleYangleChanged에서 받은 Count 수
        if (XCount >= 3 || YCount >= 3) {
          //3초 이상 X와 Y가 정상범위가 아닐때
          setState1("X or Y의 자세가 불안정해요 !"); //상태
          setState2("거북목은 안좋아요 ㅠㅠ"); //조언
        } else {
          setState1("x or Y의 자세가 정상적입니다"); //상태
          setState2("x or Y를 이렇게만 유지하세요!"); //조언
        }

        if (Xboolean == true && Yboolean == true) {
          Storage.Duplicated++;
        }
        localStorage.setItem(ConvertedStartTime, JSON.stringify(Storage));

        const SavedStorage = localStorage.getItem(ConvertedStartTime);
        if (SavedStorage != null) {
          ParsedStorage = JSON.parse(SavedStorage);
        }
        setStorageData((prevState) => ParsedStorage);
      }, 1000);
    } catch (error) {
      console.log("Argh! " + error);
    }
  }

  function hex2a(hexx) {
    //hex to Dec 변환
    let hex = hexx.toString(); //force conversion
    let str = "";
    for (let i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  function handleXangleChanged(event) {
    //X 변화 감지
    //16진수 10진수로 변환
    const length = event.target.value.byteLength;
    for (let i = 0; i < length; i++) {
      buffer[i] = event.target.value.getUint8(i).toString(16);
    }
    const bufferMerge = buffer.join("");
    Xanglevalue = hex2a(bufferMerge);

    setXangle(Xanglevalue); //Xangle useState에 설정

    if (Xanglevalue > 15 || Xanglevalue < -15) {
      //정상범위가 아닐때
      XCount++; //1초마다 interval인 상태, 정상범위가 1초간 아닐때 +1
      Storage.XTimeStorage++;
      Xboolean = true;

      if (XCount >= 3) {
        //3초간 정상범위가 아니면 진동울림
        if (XCount == 3) {
          Storage.XVibrateStorage++;
        }
        console.log("3초이상 X value 비정상적 : 진동울림 ");
      }
    } else {
      //정상범위로 돌아오면
      XCount = 0; //초기화
      Xboolean = false;
    }
  }

  //위와 같음, Y sensor 변화감지
  function handleYangleChanged(event) {
    const length = event.target.value.byteLength;
    for (let i = 0; i < length; i++) {
      buffer[i] = event.target.value.getUint8(i).toString(16);
    }
    const bufferMerge = buffer.join("");
    Yanglevalue = hex2a(bufferMerge);

    setYangle(Yanglevalue);
    if (Yanglevalue > 15 || Yanglevalue < -15) {
      YCount++;
      Yboolean = true;
      Storage.YTimeStorage++;
      if (YCount >= 3) {
        if (YCount == 3) {
          Storage.YVibrateStorage++;
        }
        console.log("3초이상 Y value 비정상적 : 진동울림 ");
      }
    } else {
      YCount = 0;
      Yboolean = false;
    }
  }

  //재연결 시도 함수
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

  //연결 해제 함수
  async function onDisconnected() {
    disConnection = true;
    setDisConnect(false);
    EndTime = Date.now();
    let EndDate = new Date(EndTime);
    EndTimeByGetTime = EndDate.getTime();
    ConvertedEndTime = timeConvert(EndTime);
    TotalTime = (EndTimeByGetTime - StartTimeByGetTime) / 1000; //경과시간 계산
    Storage.TotalTimeStorage = TotalTime;
    localStorage.setItem(ConvertedStartTime, JSON.stringify(Storage));
    setEndTimeState(ConvertedEndTime);
    setTotalTimeState(TotalTime);
    await device.gatt.disconnect(); //연결해제
  }

  //재연결 시도 함수를 위한 유틸함수
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

  //시간 계산
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
          {connected ? "" : (
          <div>
            <h3 className={styles.s1}>{state1}</h3>
            <p className={styles.s2}>{state2}</p>
          </div>
          ) }          
          {connected ? (
            <p>기기를 연결해서 측정을 시작해보세요 ! </p>
          ) : (
            <p>시작시간 : {StartTimeState}</p>
          )}
          {Disconnected ? "" : <p>종료시간 : {EndTimeState}</p>}
          {Disconnected ? "" : <p>총 경과 시간 : {TotalTimeState}</p>}
          {connected ? "" : (
            <h2>
              자세가 안좋았던 시간 :
              {StorageData.XTimeStorage +
                StorageData.YTimeStorage -
                StorageData.Duplicated}{" "}
              초
            </h2>
          ) }          
        </div>
      </div>
    </div>
  );
}
export default Header;
