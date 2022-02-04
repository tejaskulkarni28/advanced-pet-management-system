const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors())
app.use(express.json())

// configuring mysql database with server side
const db = mysql.createConnection({
    user:"root",
    database:"pu_schema",
    password:"password",
    host:"localhost",
    dateStrings:"true"
})

// Creating Post Method to get the data from client side to the server.
app.post('/Login', (req, res)=>{
    // initializing variables
    const UserPassword = req.body.UserPassword;
    const UserUniqueID = req.body.UserUniqueID;

    // console.log(UserPassword + " " + UserUniqueID); // Data is receiving :) 

    // Here after getting the user data I need to check weather the user have
    // been already registered, and if not then send the alert message 
    // Alert Message("You haven't registered yet! Please register your self and then try to Login again")

    db.query('SELECT * FROM Registered_User WHERE user_password = ? AND user_unique_id = ?', [UserPassword, UserUniqueID], 
    (err, response)=>{
        if(err){
            console.log(err)
        }
        if(response[0]){
            console.log("User Registered! ")
        }
        else{
            console.log("User Not Registered! ")
        }
    })
})

// Getting the post method to get the data from the client side to the server side
app.post('/Register', (req, res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const pass = req.body.pass;
    const uniqueID = req.body.uniqueID;

    // console.log(fname + " and " + lname + " " + pass + " " + uniqueID);

    db.query('SELECT * FROM Registered_User WHERE user_unique_id = ?', uniqueID, 
    (err, response)=>{
        if(err){
            console.log(err)
        }
        if(response[0]){
            console.log("Entered ID is already there!")
        }
        else{
                // Inserting values in mysql database
                db.query('INSERT INTO Registered_User(user_fname, user_lname, user_password, user_unique_id) VALUES(?,?,?,?)',
                    [fname,lname,pass,uniqueID],
                    (err)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log("User Registered! ")
                        }
                })
        }
    })
})


app.listen(
    3001,()=>{
        // call back funtion to get the status on which the port is being started!
        console.log("Server Started at Port 3001! ");
    }
)