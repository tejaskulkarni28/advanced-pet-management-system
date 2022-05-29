import React, { Component, useEffect } from "react";
import '../style/AddPetContainer/AddPetContainer.css'
import { useState } from "react";
import Axios from "axios";
import '../style/AddPetContainer/AddPetContainer.css';
import { Link } from "react-router-dom";


const AddPetContainer = (props)=>{

    const userID = props.data;

    const[newPet, setNewPet] = useState([]);
    const[displayPetName, setDisplayPetName] = useState([]);

    const AddNewPet = ()=>{
           Axios.post('http://localhost:3001/addPetConfig',{
            userID:userID,
            newPet:newPet
        }).then((response)=>{
            if(response){
                alert("New Pet Added!")
            }
        })
    }
    function  GetPetName (){
        
           Axios.get('http://localhost:3001/getPetName',
            {
                params:
                    {
                        userID:props.data 
                    }
            }).then((response)=>{
                if(response.data)
                setDisplayPetName(displayPetName);
                setDisplayPetName(response.data)
                console.log(response.data)
            })
    }

    // const [getDetails, setDetails] = useState([]);
    // function GetVaccineDetails (){
    //     useEffect(()=>{
    //        setDetails(getDetails);
    //         Axios.get('http://localhost:3001/get').then((response)=>{
    //             setDetails(response.data)
    //             console.log(response.data)
    //         })
    //     },[])
    // }
    // GetVaccineDetails();
    return(
        <div>
            <div className="add-pet-container">
            <div className="add-pet-content">
                <ul>
                        <li><input type="text" placeholder="Pet Name" onChange={(e)=>{setNewPet(e.target.value)}} required/></li>
                        <li><button className="addPet" onClick={AddNewPet}>Add Pet</button></li>
                        <li><button onClick={GetPetName} className="getPet">My Pets</button></li>
                </ul>
            </div>
                <div className="getPetNames">
                {displayPetName.map((value)=>{
                             return ( 
                                <div className="wrapper">
                                    {/* <img src={require('../images/puppy_dog_cute_150034_300x188.jpeg')} /> */}
                                    <div className="card">
                                        <h1>
                                           <span className="enclosed" ><Link to="/PetData" state={{pname:value.PetName, petId:value.petId}}>{value.PetName}</Link></span>
                                        </h1>
                                    </div>
                                </div>
                    )
                })}   
                </div>
            </div>
        </div>
    )
}

export default AddPetContainer;