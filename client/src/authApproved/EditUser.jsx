import React, { useState } from "react";
import '../style/EditUser/edituser.css';
import Axios from "axios";
import UserLoggedIn from "./UserLoggedIn";
import {useLocation} from "react-router-dom";

const EditUser = ()=>{

    let updatedUserName;

    const location = useLocation();
    const user_id = location.state.user_id;

    const[userFirstName, setUserFirstName] = useState('')
    const[userLastName, setUserLastName] = useState('');

    const[updatedUserFirstName, setUpdatedUserFirstName] = useState('');
    const[updatedUserLastName, setUpdatedUserLastName] = useState('');

    const UpdateUserName = ()=>{
        Axios.post('http://localhost:3001/updateUserName',{
            userFirstName:userFirstName,
            userLastName:userLastName,
            user_id:user_id
        }).then((response)=>{
            console.log(response.data[0].user_fname)
            console.log(response.data[0].user_lname)
            setUpdatedUserFirstName(response.data[0].user_fname);
            setUpdatedUserLastName(response.data[0].user_lname)
            console.log(updatedUserFirstName + " " + updatedUserLastName)
        })
    }

    return(
        <div>
            <UserLoggedIn />
            <div className="edit-user-container">
                <div className="edit-user-content">
                    <div className="edit-user-h1">
                        <h1>Updated Name: {updatedUserFirstName} {updatedUserLastName}</h1><br/>
                    </div>
                    <label>Change Username</label><br/>
                    <input type="text" placeholder="First Name" onChange={(e)=>{setUserFirstName(e.target.value)}} required/><br/>
                    <input type="text" placeholder="Last Name" onChange={(e)=>{setUserLastName(e.target.value)}} required/><br/>
                    <button onClick={UpdateUserName}>UPDATE</button>
                </div>
            </div>
        </div>
    )
}

export default EditUser;