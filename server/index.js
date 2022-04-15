
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors())
app.use(express.json())

const PORT = 3001;


const db = mysql.createConnection({
    user:"root",
    database:"pu_schema",
    password:"password",
    host:"localhost",
    dateStrings:"true"
})


let unqID = 101;
let logged = false;

app.post('/Login', (req, res)=>{

    const UserPassword = req.body.UserPassword;
    const UserUniqueID = req.body.UserUniqueID;

    db.query('SELECT * FROM Registered_User WHERE user_password = ? AND user_unique_id = ?', [UserPassword, UserUniqueID], 
    (err, response)=>{
        if(err){
            console.log(err)
        }
        console.log(response + " bug 101")
        if(response[0]){

            res.send(response[0])

            console.log("User LoggedIN! ")

            unqID = UserUniqueID;
            logged = true;
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
                        console.log(response)
                })
        }
    })
})

app.get('/username', (request,response)=>{
    db.query('SELECT user_id, user_fname, user_lname FROM Registered_User WHERE user_unique_id = ?',
    [unqID],
        (err,res)=>{
            response.send(res)
            console.log(res)
        })
})


// done to be afterwards when the username is being rendered in edituser component
let user_id = Math.min;
app.post('/updateUserName', (request, response)=>{
    const userFirstName = request.body.userFirstName;
    const userLastName = request.body.userLastName;
    user_id = request.body.user_id;

    db.query('UPDATE Registered_User SET user_fname = ?, user_lname = ? WHERE user_id = ?',[
        userFirstName,
        userLastName,
        user_id
    ],
    // (err, res)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     if(res){
    //         console.log("values updated")
    //         db.query('SELECT user_fname, user_lname FROM Registered_User WHERE user_id = ?',
    //         [user_id],
    //         (res)=>{
    //             response.send(res)
    //         })
    //     }
    // })

    (err, res)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Values updated succesfully!")
            if(res.affectedRows == 1){
                    db.query('SELECT user_fname, user_lname FROM Registered_User WHERE user_id = ?',
                    [user_id],
                        (err,res)=>{
                            console.log("Values from database:")
                            console.log(res)
                            response.send(res)
                        })
            }
        }
    }
    )
})
// app.get('/updatedUserName', (request,response)=>{
//     user_id = request.body.user_id;
//     db.query('SELECT user_fname, user_lname FROM Registered_User WHERE user_id = ?',
//     [user_id],
//         (err,res)=>{
//             if(res)
//                 console.log("got values!")
//        })
// })

app.listen(process.env.PORT ||  PORT,()=>{
        console.log(`Server running on port ${PORT}` );
    }
)
