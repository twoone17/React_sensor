import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
function Header() {
  const [connect, setConnect] = useState(true);
  const [device, setDevice] = useState("");
  const [Xangle, setXangle] = useState("");
  const [Yangle, setYangle] = useState("");
  const buffer = [];
  const onClickBluetooth = () => {
    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: ["66df5109-edde-4f8a-a5e1-02e02a69cbd5"],
      })
      .then((device) => {
        console.log("Connecting to GATT Server...");
        setConnect(false);
        setDevice(device);
        return device.gatt.connect();
      })
      .then((server) => {
        console.log("Getting Battery Service...");
        console.log(server);
        return server.getPrimaryService("66df5109-edde-4f8a-a5e1-02e02a69cbd5");
      })
      .then((service) => {
        console.log("Getting acc x ..");
        console.log(
          service.getCharacteristic("741c12b9-e13c-4992-8a5e-fce46dec0bff")
        );
        return service.getCharacteristic(
          "741c12b9-e13c-4992-8a5e-fce46dec0bff"
        );
        //y
        // return service.getCharacteristic(
        //   "baad41b2-f12e-4322-9ba6-22cd9ce09832"
        // );
      })
      .then((value) => {
        value.addEventListener(
          "characteristicvaluechanged",
          handleBatteryLevelChanged
        );
        return value.readValue();
      })
      .then((value) => {
        console.log(value);
        console.log(value.getUint8(0));
        for (let i = 0; i < 7; i++) {
          buffer[i] = value.getUint8(i).toString(16);
        }
        // buffer.toString();
        const bufferMerge = buffer.join("");
        const Xanglevalue = hex2a(bufferMerge);
        setXangle(Xanglevalue);
        console.log(Xanglevalue);
      })
      .catch((error) => {
        console.log("Argh! " + error);
      });
  };

  function hex2a(hexx) {
    let hex = hexx.toString(); //force conversion
    let str = "";
    for (let i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  function handleBatteryLevelChanged(event) {
    const gyroX = event.target.value.getUint8(0);
    console.log("changed value: " + gyroX);
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
