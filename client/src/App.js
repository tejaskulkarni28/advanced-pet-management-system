import React from "react";
import DefaultPage from "./pages/DefaultPage";
import './style/app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLoggedIn from "./authApproved/UserLoggedIn";
import EditUser from "./authApproved/EditUser";
import PetData from "./components/PetData";
import '../src/style/PetData/petdata.css';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DefaultPage/>} />
          <Route path="/loggedin" element={<UserLoggedIn/>} />
          <Route path="/user-settings" element={<EditUser/>} />
          <Route path="/petdata" element={<PetData/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
