import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";


function Header() {
  const [connect, setConnect] = useState(true);
  const [device, setDevice] = useState("");
  const ACCELEROMETER_SERVICE_UUID = "741c12b9-e13c-4992-8a5e-fce46dec0bff";

  const onClickBluetooth = () => {
    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: ["baad41b2-f12e-4322-9ba6-22cd9ce09832"],
      })
      .then((device) => {
        console.log("Connecting to GATT Server...");
        return device.gatt.connect();
      })
      .then((server) => {
        console.log("Getting Battery Service...");
        console.log(server);
        return server.getPrimaryService("baad41b2-f12e-4322-9ba6-22cd9ce09832");
      })
      .then((service) => {
        console.log("Getting Battery Level Characteristic...");
        console.log(service.getCharacteristic());
        return service.getCharacteristic();
      })
      // .then((characteristic) => {
      //   let batteryLevel = value.getUint8(0);
      // })
      .then((value) => {
        let batteryLevel = value.getUint8(0);
        console.log("> Battery Level is " + batteryLevel + "%");
      })
      .catch((error) => {
        console.log("Argh! " + error);
      });
  };

  console.log(device);

  return (
    <div className={`${styles.row} ${styles.back}`}>
      <button onClick={onClickBluetooth}>Click to connect bluetooth</button>
      {connect ? (
        <h1>Device Loading...</h1>
      ) : (
        <h1>Device name : {device.name}</h1>
      )}
      <p></p>
      <h1>hu</h1>
      

    </div>
  );
}

export default Header;