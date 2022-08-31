import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
function Header() {
  const [connect, setConnect] = useState("0");
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

      console.log("Connecting to GATT Server...");
      const server = await deviceActivate.gatt.connect();
      const service = await server.getPrimaryService(
        "66df5109-edde-4f8a-a5e1-02e02a69cbd5"
      );
      const characteristic = await service.getCharacteristic(
        "741c12b9-e13c-4992-8a5e-fce46dec0bff"
      );
      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleBatteryLevelChanged
      );

      setInterval(() => {
        const Xvalue = characteristic.readValue();
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

  function handleBatteryLevelChanged(event) {
    const gyroX = event.target.value.getUint8(0);
    const length = event.target.value.byteLength;
    console.log("changed value: " + gyroX);
    for (let i = 0; i < length; i++) {
      buffer[i] = event.target.value.getUint8(i).toString(16);
    }
    // buffer.toString();
    const bufferMerge = buffer.join("");
    const Xanglevalue = hex2a(bufferMerge);
    setXangle(Xanglevalue);
    console.log(Xanglevalue);
  }
  console.log(device);

  return (
    <div className={`${styles.row} ${styles.back}`}>
      <button onClick={onClickBluetooth}>Click to connect bluetooth</button>
      {connect ? (
        <h1>Device Loading...</h1>
      ) : (
        <h1>Device name : {device.name}</h1>
      )}
      <h2>XAngle : {Xangle} </h2>
      <h2>YAngle : {Yangle} </h2>
    </div>
  );
}
export default Header;
