import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

function Header() {
  const [connect, setConnect] = useState(true);
  const [device, setDevice] = useState("");
  const [Xangle, setXangle] = useState("");
  const [Yangle, setYangle] = useState("");
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
      console.log("Connecting to GATT Server...");
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

      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleXangleChanged
      );

      characteristic2.addEventListener(
        "characteristicvaluechanged",
        handleYangleChanged
      );

      setInterval(() => {
        const Xvalue = characteristic.readValue();
        const Yvalue = characteristic2.readValue();
      }, 500);
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
    // buffer.toString();
    const bufferMerge = buffer.join("");
    const Xanglevalue = hex2a(bufferMerge);
    setXangle(Xanglevalue);
    console.log("Xangle" + Xanglevalue);
  }

  function handleYangleChanged(event) {
    const length = event.target.value.byteLength;
    for (let i = 0; i < length; i++) {
      buffer[i] = event.target.value.getUint8(i).toString(16);
    }
    // buffer.toString();
    const bufferMerge = buffer.join("");
    const Yanglevalue = hex2a(bufferMerge);
    setYangle(Yanglevalue);
    console.log("Yangle" + Yanglevalue);
  }

  return (
    <div>
      <div className={styles.row}>
        <button onClick={onClickBluetooth}>Click to connect bluetooth</button>
        {connect ? (
          <h1>Device Loading...</h1>
        ) : (
          <h1>Device name : {device.name}</h1>
        )}
        <h2>XAngle : {Xangle} </h2>
        <h2>YAngle : {Yangle} </h2>
      </div>
      <div>
        
      </div>
    </div>
  );
}
export default Header;

