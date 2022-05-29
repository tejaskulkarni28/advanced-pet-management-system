import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import {useNavigate} from "react-router";
import { Link } from "react-router-dom";

const AccessedNavBar =()=>{
    const Navigate = useNavigate();
    const[userName, setUserName] = useState([]);
    const[user_id, setUserID] = useState();

    const Username = () =>{
        useEffect(()=>{
            setUserName(userName)
            Axios.get('http://localhost:3001/username').then((res)=>{
                setUserName(res.data)
                console.table(res.data);
                

                setUserID(res.data[0].user_id)
            })
        },[])
    }
    Username();
    const navigatetohome =()=>{
        Navigate("/loggedin")
    }
    // const navigatetoback =()=>{
    //     Navigate("/")
    // }
    return(
        <div>
            <div className="nav-container">
                <div className="nav-content">
                        {userName.map((i)=>{
                            return <ul>
                                <li onClick={navigatetohome}>Pet Bucket</li>
                                <li className="content l">
                                <Link
                                to="/user-settings"
                                state={{
                                    user_id:user_id,
                                    username:userName
                                }}
                                >
                                 <button>{i.user_fname} {i.user_lname}</button>
                                </Link>
                                </li>
                            </ul>
                        })}
                </div>
            </div>
        </div>
    )
}

export default AccessedNavBar;