import React from "react";
import '../style/login.css';
import {Link} from "react-router-dom";

const Login = ()=>{
    return(
        <div className="login-container">
            <div className="login-content">
            {/* All the login neccessary things will here.  */}
            <input type="text" placeholder="Enter PetBucket Id" /><br/>
            <input type="password" placeholder="Enter Password" /><br/>
            <button>Login</button>
            </div>
        </div>
    )
}

export default Login;