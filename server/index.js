
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

    const userPetId = uniqueID;

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
                db.query('INSERT INTO PetData(petUserId ) VALUES(?)',
                [userPetId]);
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

app.post('/addPetConfig', (request, response)=>{
    // const userUniqueId = request.body.userUniqueID;
    const newPet = request.body.newPet;
    // console.log(userId)

    db.query('SELECT COUNT(petUserId) AS COUNT, petUserId from pu_schema.PetData WHERE petUserId = ?',
    [unqID],
    (err, res)=>{
        if(err){
            console.log(err)
        }
        if(res[0].COUNT <= 3){
            // Insert New Pet
            db.query('INSERT INTO pu_schema.PetData(petUserId,PetName) VALUES(?,?)',
            [unqID,newPet],
            (err, res)=>{
                if(err){
                    console.log(err)
                }
                if(res){
                    console.log(res)
                }
            })
        }
        if(res[0].COUNT > 3){
            console.log("Please Subscribe! ")
        }
    }
    )


})

app.get('/getPetName',(request, response)=>{

    db.query('SELECT petId, PetName, petUserId FROM PetData WHERE petUserId = ? ',
    [unqID],
    (err, res)=>{
        if(err){
            console.log(err)
        }
        if(res){
            console.log(res)
            response.send(res)
        }
    })
})

app.post('/addPetDetails', (request, response)=>{
    const petId = request.body.petId;
    const vname = request.body.vname;
    const date = request.body.date;
    const dueDate = request.body.dueDate;

    console.log(petId + " " + vname + " " + date + " " + dueDate);

    db.query('INSERT INTO pu_schema.VaccineDetails(petId, VaccineName, Date, DueDate) VALUES(?,?,?,?)',
    [petId, vname, date, dueDate],
    (err, res)=>{
        if(err){
            console.log(err)
        }
        if(res){
            console.log("Values Inserted Successfully!")
        }
    })
})

app.get('/getPetDetails',(request, response)=>{
    const petId = request.query.petId;
    console.log("This is petId: " + petId)

    db.query('SELECT * FROM pu_schema.VaccineDetails WHERE petId = ?',
    [petId],
    (err, res)=>{
        if(err){
            console.log(err)
        }
        if(res){
            console.log(res)
        }
        response.send(res)
    })
})

app.post('/updatePetDetails', (request, response)=>{
    const vid = request.body.vid;
    const updatevname = request.body.updatevname;
    const updatedate = request.body.updatedate;
    const updatedueDate = request.body.updatedueDate;

    console.log("Updated values:- " + vid + " " + updatevname + " " + updatedate + " " + updatedueDate);

    db.query('UPDATE VaccineDetails SET  VaccineName = ?, Date = ?, DueDate = ? WHERE vid = ?',
    [updatevname,updatedate,updatedueDate,vid],
    (err,res)=>{
        if(err){
            console.log(err)
        }
        if(res){
            response.send(res)
        }
    })
})

app.post('/deleteRecordFunction', (request, response)=>{
    const deleteRecord = request.body.deleteRecord;

    db.query('DELETE FROM VaccineDetails WHERE vid = ?',
    [deleteRecord])
})

app.listen(process.env.PORT ||  PORT,()=>{
        console.log(`Server running on port ${PORT}` );
    }
)

