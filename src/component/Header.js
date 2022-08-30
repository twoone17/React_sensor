import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [connect, setConnect] = useState(true);
  const [device, setDevice] = useState("");

  const onClickBluetooth = () => {
    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: ["66df5109-edde-4f8a-a5e1-02e02a69cbd5"],
      })
      .then((device) => {
        console.log("Connecting to GATT Server...");
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
      })
      .catch((error) => {
        console.log("Argh! " + error);
      });
  };

  function handleBatteryLevelChanged(event) {
    console.log("changed!");
  }
  console.log(device);

  return (
    <div>
      <button onClick={onClickBluetooth}>Click to connect bluetooth</button>
      {connect ? (
        <h1>Device Loading...</h1>
      ) : (
        <h1>Device name : {device.name}</h1>
      )}
    </div>
  );
}

export default Header;
