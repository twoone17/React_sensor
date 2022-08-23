import { useState } from "react";
import styles from "./Header.module.css"

function Header() {
    const [cord, setCord] = useState([])
   
   
    return (
        <div>
            <h1 className={styles.row}>X : 120</h1>
            <h1 className={styles.row}>Y : 120</h1>
            
        </div>
        

    )

}

export default Header;