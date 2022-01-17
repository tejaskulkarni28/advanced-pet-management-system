import React from "react";
import '../style/regis.css';

const Registration = ()=>{
    return(
        <div className="regis-container">
            {/* Here all the Registration neccessary things 
            will be there. */}
            <div className="regis-content">
                <input type="text" placeholder="First Name" /><br/>
                <input type="text" placeholder="Last Name" /><br/>
                <input type="password" placeholder="Create Password" /><br/>
                <button>Register</button>
            </div>
        </div>
    )
}

export default Registration;