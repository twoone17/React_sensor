import React from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "./s1.css";


function Home() {
   
    return (
        <div className="back" style={{
            height: "104vh",          
          }}>
            <Header />
            <Footer />
            
        </div>    
    
    )

}

export default Home;