import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <div>
                <NavLink to="/analysis">
                    Analysis
                </NavLink>
            </div>
            <div>
                <NavLink to="/">
                    Home
                </NavLink>
            </div>
        </nav>
    );

};

export default Nav;