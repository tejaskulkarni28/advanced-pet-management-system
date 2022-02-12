import React from "react";
import '../style/LoginRegister/login.css';
import { useState } from "react";
import Axios from "axios";

const Login = ()=>{
    const [userPassword, setUserPassword] = useState("");
    const [userUniqueID, setUserUniqueID] = useState();

    const sendUserAuth = ()=>{
        Axios.post("http://localhost:3001/Login",{
            UserPassword:userPassword,
            UserUniqueID: userUniqueID
        }).then((response)=>{
            console.log(response.data.user_id)
            if(response.data.user_id > 0){
                alert("Logged In!")
            }
            else{
                alert("Register first!")
            }
        })
    }

    return(
        <div className="login-container">
            <div className="login-content">
            <input type="password" placeholder="Enter Password" onChange={(e)=>{setUserPassword(e.target.value)}} required/><br/>
            <input type="number" placeholder="Unique ID!" onChange={(e)=>{setUserUniqueID(e.target.value)}} required/><br/>
            <button onClick={sendUserAuth}>Login</button>
            </div>
        </div>
    )
}

export default Login;