import React from "react";
import AddPetContainer from "../components/AddPetContainer";
import { useState, useEffect } from "react";
import Axios from "axios";
import {useNavigate} from "react-router";
import {Link, useLink} from "react-router-dom";
import '../style/NavBar/navbarloggedin.css';
import Footer from "../components/Footer";

const UserLoggedIn = ()=>{

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

    const RedirectUserSettings =()=>{
        Navigate("/user-settings")
    }

    const navigatetohome =()=>{
        Navigate("/")
    }

    const usrID_for_add_pet_container = user_id; // this variable naming seems unproffessional but it is ok sometimes to make it work :(

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
                                    user_id:user_id
                                }}
                                >
                                 <button onClick={RedirectUserSettings}>{i.user_fname} {i.user_lname}</button>
                                </Link>
                                </li>
                            </ul>
                        })}
                </div>
            </div>
            <AddPetContainer data={usrID_for_add_pet_container}/>
            <Footer/>
        </div>
    )
}

export default UserLoggedIn;