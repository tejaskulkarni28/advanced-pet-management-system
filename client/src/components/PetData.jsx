import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useLocation} from "react-router-dom";
import Axios from "axios";


const PetData =()=>{
    const location = useLocation();
    const pname = location.state.pname;
    const petId = location.state.petId;
    const navigate = useNavigate();
    const navigatetohome =()=>{
        navigate("/")
    }
    // const[petName, setPetName] = useState("");
    console.log(pname + "  id:" + petId)
    // const PetName =()=>{
    //     useEffect(()=>{
    //         console.log(petName)
    //         setPetName(petName)
    //         console.log(petName)
    //     },[])
    // }
    // PetName();

    const[vname, setVName] = useState('');
    const[date, setDate] = useState('');
    const[dueDate, setDueDate] = useState('');

    const[vid, setVid] = useState();
    const[updatevname, updatesetVName] = useState('');
    const[updatedate, updatesetDate] = useState('');
    const[updatedueDate, updatesetDueDate] = useState('');

    const[petDetails,setPetDetails] = useState([]);
    const[deleteRecord, setDeleteRecord] = useState();
    // const[vid, setVid] = useState();

    const addPetDetails =()=>{
        Axios.post('http://localhost:3001/addPetDetails',{
            petId:petId,
            vname:vname,
            date:date,
            dueDate:dueDate
        })
    }


    const GetPetDetails =()=>{
        // useEffect(()=>{

            // setPetDetails(petDetails);
            Axios.get('http://localhost:3001/getPetDetails',{
                params:{
                    petId:petId
                }
            }).then((response)=>{
                if(response){
                    console.log(response)
                    setPetDetails(petDetails);
                    setPetDetails(response.data)
                    // setVid(response.data.vid)
                }
            })
        // },[])
    }
    // GetPetDetails();

    const updatePetDetails =()=>{
        Axios.post('http://localhost:3001/updatePetDetails',
        {
            vid:vid,
            updatevname:updatevname,
            updatedate:updatedate,
            updatedueDate:updatedueDate
        }).then((response)=>{
            console.log(response + " from update details")
        })
    }

    const deleteRecordFunction =()=>{
        Axios.post('http://localhost:3001/deleteRecordFunction',{
            deleteRecord:deleteRecord
        })
    }

    return(
        <div>
            <div className="nav-container">
                <div className="nav-content">
                    <ul>
                        <li onClick={navigatetohome}>Pet Bucket</li>
                        <li Style="margin-left:20px;">{pname}</li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="left-side-container">
                    <h1>Enter Vaccine Details</h1>
                    <input type="text" onChange={(e)=>{setVName(e.target.value)}} placeholder="Vaccine name" /><br/>
                    <input type="date" onChange={(e)=>{setDate(e.target.value)}}/><br/>
                    <input type="date" onChange={(e)=>{setDueDate(e.target.value)}}/><br/>
                    <button onClick={addPetDetails}>Submit</button><br/>
                    <button onClick={GetPetDetails}>Vaccine Details</button>
                    <div className="update-container">
                        <h1>Update record</h1>
                        <input type="number" onChange={(e)=>{setVid(e.target.value)}} placeholder="ID" /><br/>
                        <input type="text" onChange={(e)=>{updatesetVName(e.target.value)}} placeholder="Vaccine name" /><br/>
                        <input type="date" onChange={(e)=>{updatesetDate(e.target.value)}}/><br/>
                        <input type="date" onChange={(e)=>{updatesetDueDate(e.target.value)}}/><br/>
                        <button onClick={updatePetDetails}>Submit</button><br/>
                    </div>
                    <div className="delete-container">
                        <h1>Delete record</h1>
                        <input type="number" onChange={(e)=>{setDeleteRecord(e.target.value)}} placeholder="Enter ID" /><br/>
                        <button onClick={deleteRecordFunction}>Submit</button>
                    </div>
                </div>
                <div className="right-side-container">
                    <table>
                        <thead>
                            <th>ID</th>
                            <th>Vaccine Name</th>
                            <th>Date</th>
                            <th>Due Date</th>
                        </thead>
                        {petDetails.map((value)=>{
                            return(
                                <tbody>
                                <tr>
                                    <td>{value.vid}</td>
                                    <td>{value.VaccineName}</td>
                                    <td>{value.Date}</td>
                                    <td>{value.DueDate}</td>
                                </tr>
                            </tbody>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PetData;