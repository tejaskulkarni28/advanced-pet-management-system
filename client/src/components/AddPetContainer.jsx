import React from "react";
import '../style/AddPetContainer/AddPetContainer.css'

const AddPetContainer = ()=>{
    return(
        <div>
            <div className="add-pet-container">
                <div className="add-pet-content">
                    <ul>
                        <li>Lucy</li>
                        <li>Max</li>
                        <li>Bird</li>
                        <li>Turtle</li>
                        <li>Fish</li>
                        <li><button>+</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AddPetContainer;