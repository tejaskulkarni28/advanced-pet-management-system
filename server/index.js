const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user:"root",
    database:"pu_schema",
    password:"password",
    host:"localhost",
    dateStrings:"true"
})

app.post('/Login', (req, res)=>{

    const UserPassword = req.body.UserPassword;
    const UserUniqueID = req.body.UserUniqueID;

    db.query('SELECT * FROM Registered_User WHERE user_password = ? AND user_unique_id = ?', [UserPassword, UserUniqueID], 
    (err, response)=>{
        if(err){
            console.log(err)
        }
        if(response[0]){

            res.send(response[0])

            console.log("User LoggedIN! ")
        }
        else{
            res.send(response)
            console.log("User Not Registered! ")
        }
    })
})

app.post('/Register', (req, res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const pass = req.body.pass;
    const uniqueID = req.body.uniqueID;

    db.query('SELECT * FROM Registered_User WHERE user_unique_id = ?', uniqueID, 
    (err, response)=>{
        if(err){
            console.log(err)
        }
        if(response[0]){
            console.log("Entered ID is already there!")
            res.send(response)
        }
        else{
                db.query('INSERT INTO Registered_User(user_fname, user_lname, user_password, user_unique_id) VALUES(?,?,?,?)',
                    [fname,lname,pass,uniqueID],
                    (response)=>{
                        res.send(response)
                })
        }
    })
})


// for local system
// app.listen(
//     3001,()=>{
//         console.log("Server Started at Port 3001! ");
//     }
// )

// for heroku server
app.listen(
    process.env.PORT || PORT,()=>{
        console.log(`Server running on port ${PORT}` );
    }
)