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
  let CheckError;
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
  let X40Count = 0;
  let YCount = 0;
  let Y40Count = 0;
  let X40boolean = false;
  let Y40boolean = false;
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
  let flagCount = 0;
  const [startButton, setStartButton] = useState(false);
  const [flag, setFlag] = useState(0);
  let flagCheck = 1;

  // function onClickFlag() {
  //   flagCount++;
  //   if (flagCount % 2) {
  //     flagCheck = 0;
  //     console.log(flagCheck);
  //   } else {
  //     flagCheck = 1;
  //     console.log(flagCheck);
  //   }
  // }
  async function onClickBluetooth() {
    //bluetooth 연결시 버튼
    try {
      //연결되는 장치 조건 필터링, 추후에 해당 기기만 연결되게 변경 예정
      const deviceActivate = await navigator.bluetooth.requestDevice({
        filters: [
          {
            services: ["66df5109-edde-4f8a-a5e1-02e02a69cbd5"],
          },
        ],
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
      // connect(); //자동 재연결 (작동 잘 안됨)
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

      const characteristicFlag = await service.getCharacteristic(
        "1a4a954a-494c-11ed-b878-0242ac120002"
      );
      const Xvalue = characteristic.readValue();
      const Yvalue = characteristic2.readValue();

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
        }
        CCount++;
        const Xvalue = characteristic.readValue(); //Xsensor 값 읽기 (이걸 포함해야 characteristicvaluechanged 의 EventListener가 먹힘)
        const Yvalue = characteristic2.readValue(); //Ysensor 값 읽기

        // if (flagCheck == 0) {
        //   console.log("flag = 0");
        //   characteristicFlag.writeValue(
        //     new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
        //   );
        // } else {
        //   console.log("flag = 1");
        //   characteristicFlag.writeValue(
        //     new Uint8Array([0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02])
        //   );
        // }

        //handleXangleChanged , handleYangleChanged에서 받은 Count 수
        if (XCount >= 7 || YCount >= 7) {
          //3초 이상 X와 Y가 정상범위가 아닐때
          setState1("자세가 불안정해요 !"); //상태
          setState2("안좋은 자세는 건강을 해쳐요 !"); //조언
          if (X40boolean == true || Y40boolean == true) {
            setState1("자세가 너무 안좋습니다 !! ");
            setState2("지금 당장 허리를 펴주세요 ! ");
          }
        } else {
          setState1("자세가 정상적입니다"); //상태
          setState2("이렇게만 유지하세요!"); //조언
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
    console.log("EVent");
    console.log(event);
    console.log(event.target.value);
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

      if (Xanglevalue > 40 || Xanglevalue < -40) {
        X40boolean = true;
      } else {
        X40boolean = false;
      }
      if (XCount >= 7) {
        //3초간 정상범위가 아니면 진동울림
        if (XCount == 7) {
          Storage.XVibrateStorage++;
        }
        console.log("7초이상 Y value 비정상적 : 진동울림 ");
      }
    } else {
      //정상범위로 돌아오면
      XCount = 0; //초기화
      X40Count = 0;
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
    if (Yanglevalue > 10 || Yanglevalue < -10) {
      YCount++;
      Yboolean = true;
      Storage.YTimeStorage++;
      if (Yanglevalue > 40 || Yanglevalue < -40) {
        Y40boolean = true;
      } else {
        Y40boolean = false;
      }
      if (YCount >= 7) {
        if (YCount == 7) {
          Storage.YVibrateStorage++;
        }
        console.log("7초이상 Y value 비정상적 : 진동울림 ");
      }
    } else {
      YCount = 0;
      Y40Count = 0;
      Yboolean = false;
    }
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
      <div className={styles.TextBox}>
        {connected ? (
          ""
        ) : Disconnected ? (
          <div>
            <h3 className={styles.s1}>{state1}</h3>
            <p className={styles.s2}>{state2}</p>
          </div>
        ) : (
          ""
        )}{" "}
        {/*연결 되어있는 동안만*/}
        {connected ? (
          <div>
            <br></br>
            <p className={styles.defaultHeaderRender}>
              기기를 연결해서 측정을 시작해보세요 !{" "}
            </p>
          </div>
        ) : (
          <div>
            <br></br>
            <p className={styles.defaultHeaderRender}>
              시작시간 : {StartTimeState}
            </p>
          </div>
        )}
        {Disconnected ? (
          ""
        ) : (
          <p className={styles.defaultHeaderRender}>
            종료시간 : {EndTimeState}
          </p>
        )}
        {Disconnected ? (
          ""
        ) : (
          <p className={styles.defaultHeaderRender}>
            총 경과 시간 : {TotalTimeState}
          </p>
        )}
        {connected ? (
          ""
        ) : (
          <div className={styles.defaultHeaderRender}>
            <p>
              자세가 안좋았던 시간 :
              {StorageData.XTimeStorage +
                StorageData.YTimeStorage -
                StorageData.Duplicated}{" "}
              초
            </p>
            <p>
              진동 횟수 :{" "}
              {StorageData.XVibrateStorage + StorageData.YVibrateStorage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
