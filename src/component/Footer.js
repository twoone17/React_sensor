import styles from "./Footer.module.css"

function Footer() {
    const AppName = "SensorApp"
   
    return (        
        <div className={styles.footer} style={{display: 'flex'}}>
            <img src="img/logo.png"></img>
            <h1 className={styles.a}>{AppName}</h1>

        </div>
    )

}

export default Footer;