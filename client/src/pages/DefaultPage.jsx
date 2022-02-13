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
        </div>
    )
}

export default DefaultPage;