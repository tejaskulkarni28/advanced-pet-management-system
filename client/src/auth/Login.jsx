import React from "react";
import '../style/LoginRegister/login.css';
import { useState } from "react";
import Axios from "axios";

const Login = ()=>{
    // const [idUser, setIdUser] = useState();
    const [userPassword, setUserPassword] = useState("");
    const [userUniqueID, setUserUniqueID] = useState();

    // Pass Data using Axios to server side.
    const sendUserAuth = ()=>{
        Axios.post("http://localhost:3001/Login",{
            // UserId:idUser,
            UserPassword:userPassword,
            UserUniqueID: userUniqueID
        })
    }

    return(
        <div className="login-container">
            <div className="login-content">
            {/* All the login neccessary things will here.  */}
            {/* <input type="text" placeholder="Enter PetBucket Id" onChange={(e)=>{setIdUser(e.target.value)}} required/><br/> */}
            <input type="password" placeholder="Enter Password" onChange={(e)=>{setUserPassword(e.target.value)}} required/><br/>
            <input type="number" placeholder="Unique ID!" onChange={(e)=>{setUserUniqueID(e.target.value)}} required/><br/>
            <button onClick={sendUserAuth}>Login</button>
            </div>
        </div>
    )
}

export default Login;