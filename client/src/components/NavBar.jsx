import React from "react";
import '../style/NavBar/navbar.css';
import {useNavigate} from "react-router";              

const NavBar = ()=>{
    let navigate = useNavigate();
    return(
        <div className="nav-container">
            <ul>
                <li><navigate path="/">Pet Bucket</navigate></li>
            </ul>
        </div>
    )
}

export default NavBar;