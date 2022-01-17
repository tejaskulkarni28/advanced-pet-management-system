import React from "react";
import NavBar from "../components/NavBar";
import Login from "../auth/Login";
import Registration from "../auth/Registration";
import Footer from "../components/Footer";

const DefaultPage = ()=>{
    return(
        <div>
            <NavBar />
            <Login />
            <Registration />
            <Footer />
            {/* Here there are going to be 2 components 
            1. Login
            2. Registration */}
        </div>
    )
}

export default DefaultPage;