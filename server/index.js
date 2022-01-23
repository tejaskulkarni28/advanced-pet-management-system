const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json())

// Creating Post Method to get the data to the server side.
app.post('/Login', (req, res)=>{
    // initializing variables
    const UserId = req.body.UserId;
    const UserPassword = req.body.UserPassword;

    console.log(UserId + " and " + UserPassword);
})

// Getting the post method to get the data from the client side to the server side
app.post('/Register', (req, res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const pass = req.body.pass;

    console.log(fname + " and " + lname + " " + pass);
})


app.listen(
    3001,()=>{
        // call back funtion 
        console.log("Server Started at Port 3001! ");
    }
)