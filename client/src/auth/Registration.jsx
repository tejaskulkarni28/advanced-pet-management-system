import React from "react";
import '../style/LoginRegister/regis.css';
import { useState } from "react";
import Axios from "axios";

const Registration = ()=>{

    const[fname, setFirstName] = useState('');
    const[lname, setLastName] = useState('');
    const[pass, setPass] = useState('');
    const[uniqueID, setUniqueID] = useState();

    const register = ()=>{
        Axios.post("http://localhost:3001/Register", {
            fname: fname,
            lname: lname,
            pass:pass,
            uniqueID:uniqueID
        }).then((response)=>{

            if(response.data === ''){
                alert("Successfully Registered!")
            }

            if(response.data[0].user_id > 0){
                alert("ID already there!!")
            }
        })
    }

    return(
        <div className="regis-container">
            <div className="regis-content">
                <input type="text" placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}} required/><br/>
                <input type="text" placeholder="Last Name" onChange={(e)=>{setLastName(e.target.value)}} required/><br/>
                <input type="password" placeholder="Create Password" onChange={(e)=>{setPass(e.target.value)}} required/><br/>
                <input type="number" placeholder="Create Unique ID" onChange={(e)=>{setUniqueID(e.target.value)}}required/><br/>
                <button onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default Registration;