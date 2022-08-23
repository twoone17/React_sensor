import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [connect, setConnect] = useState(true);
  const [device, setDevice] = useState("");


  const onClickBluetooth = () => {
    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: ["battery_service"],
      })
      .then((device) => {
        console.log(`Name: ${device}`);
        console.log(device);
        setConnect(false);
        const interval = setInterval(() => {
          setDevice(device);
          console.log("refresh");
          console.log(device);
        }, 1000);
      })
      .catch((error) => console.error(`Something went wrong. ${error}`));
  };
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
