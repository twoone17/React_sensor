import styles from "./Footer.module.css"

function Footer() {
    const AppName = "SensorApp"
   
    return (
      <div
        className={styles.footer}
        style={{
          width: "100%",
          borderTop: "0.2px solid black",
          lineHeight: "0.1em",
          margin: "10px 0 0px",
          display: "flex",
        }}
      >
        <img width="100" height="100" src="img/logo2-1.png"></img>
        <h1 className={styles.a}>{AppName}</h1>
      </div>
    );

}

export default Footer;