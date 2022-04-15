import React from "react";
import '../style/LoginRegister/login.css';
import { useState } from "react";
import Axios from "axios";

import { useNavigate} from "react-router";


const Login = ()=>{
    let Navigate = useNavigate();

    const [userPassword, setUserPassword] = useState("");
    const [userUniqueID, setUserUniqueID] = useState();

    function sendUserAuth(){

        Axios.post("http://localhost:3001/Login",{
            UserPassword:userPassword,
            UserUniqueID: userUniqueID
        }).then((response)=>{
            if(response.data.user_id > 0){
                   Navigate('/loggedin')
            }
            else{
                alert("Values Incorrect/Not registered!")
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