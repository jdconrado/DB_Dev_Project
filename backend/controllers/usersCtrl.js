const usersModel = require('../models/Users');
const jwt = require('jsonwebtoken');
let requests = require('request');
const usersCtrl = {}

usersCtrl.getData= async (req, res) => {
    let {name,lastname} = await usersModel.findById(req.params.id);
    if(name){
        res.json({
            "result":"Successful.",
            "data": {
                name,
                lastname
            }
        });
    }else{
        res.json({
            "result":"Error.",
            "error":"Not found",
            "req": req.params
        });
    }
}


usersCtrl.insertData = async (req, res)=>{
    try{
        //console.log(req.body);
        var {name, lastname, email, password, cpassword, phone, DateOfBirth, ImageID, vendor}=req.body;
        //console.log(email);
        phone = "";
        DateOfBirth = new Date();
        ImageID = "";
        if(password==cpassword){
            const emU = await usersModel.findOne({email: email});
            if(emU){
                console.log('Email in use.');
                //Redirect
                return res.json({
                    "result":"error.",
                    "error": "Email en uso."
                });
            }
            let data = new usersModel({name, lastname, phone, email, DateOfBirth, ImageID, password});
            data.password = await data.encryptPassword(password);
            //console.log(data);
            await data.save();
            var js={"userId": data.id};
            if(vendor == true){
                requests.post('http://localhost:8080/USERS/VENDORS/create', {json: js});
            }else{
                //console.log('Datos guardados.');
                requests.post('http://localhost:8080/USERS/CLIENTS/create', {json: js});
            }
            //var token = data.generateJwt();
            //console.log(token);
            res.json({
                "result":"Successful.",
            }); 
            
        }else{
            console.log("Contraseñas no iguales.");
        }
    }catch(err){
        res.json({
            "result":"error.",
            "error":err
        });
    }
};

usersCtrl.login = async(req, res)=>{
   console.log(req.body);
   const {email, password}=req.body;
   const femail= await usersModel.findOne({email: email});
   if(femail){
        const fpass= await femail.matchPassword(password);
        if(fpass){
            var token = femail.generateJwt();
            console.log(token);
            console.log("Done");
            res.json({
                "result":"Successful.",
                "token":token
            }); 
        }else{
            console.log("Error, pass");
            res.json({
                "result":"Error.",
                "error":"Contraseña incorrecta."
            }); 
        }
   }else{
       console.log("not f, Error");
       res.json({
        "result":"Error.",
        "error":"Email no encontrado."
    }); 
   }
};

usersCtrl.tokenCheck = function (req, res){
    if(!req.payload._id){
        res.sendStatus(403);
    }else{
        usersModel.findById(req.payload._id).exec(function(err,user){
            res.status(200).json(user);
        });
    };
};

usersCtrl.authT = function (req, res, next){
    const bearerHeader = req.headers['Authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
};

usersCtrl.tokenC = function (req, res){
    jwt.verify(req.token, 'DevProj',(err, authdata)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'good',
                authdata
            });
        }
    })
};

//UnComment when services are up.
//usersCtrl.authT = jwt({
  //      secret: 'DevProj',
  //      userProperty: 'payload'
  //    });


module.exports = usersCtrl;