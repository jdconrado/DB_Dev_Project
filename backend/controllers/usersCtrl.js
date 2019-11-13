const usersModel = require('../models/Users');
const jwt = require('jsonwebtoken');
let requests = require('request');
const usersCtrl = {}

usersCtrl.getData= async (req, res) => {
    let {name,lastname,phone,email,DateOfBirth,ImageID} = await usersModel.findById(req.params.id);
    res.json({
        "result":"Successful.",
        name,
        lastname,
        phone,
        email,
        DateOfBirth,
        ImageID
    });
}

usersCtrl.insertData = async (req, res)=>{
    console.log(req.body);
    var {name, lastname, email, password, cpassword, phone, DateOfBirth, ImageID, vendor}=req.body;
    console.log(email);
    phone = "";
    DateOfBirth = new Date();
    ImageID = "";
    if(password==cpassword){
        const emU = await usersModel.findOne({email: email});
        if(emU){
            console.log('Email in use.');
            //Redirect
            return res.redirect('/USERS/');
        }
        let data = new usersModel({name, lastname, phone, email, DateOfBirth, ImageID, password});
        data.password = await data.encryptPassword(password);
        console.log(data);
        await data.save();
        var js={"userId": data.id};
        if(vendor.localeCompare("vendor")==0){
             requests.post('http://localhost:8080/USERS/VENDORS/create', {json: js});
        };
        var token = data.generateJwt();
        console.log(token);
        console.log('Datos guardados.');
        requests.post('http://localhost:8080/USERS/CLIENTS/create', {json: js});
        return await res.redirect("/USERS/");
        //Redirect
    }else{
        console.log("Contraseñas no iguales.");
        return res.redirect("/USERS/");
        //Redirect  
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
        return res.redirect('/USERS/');
    }else{
        console.log("Error, pass");
        return res.redirect('/USERS/');
    }
   }else{
       console.log("not f, Error");
       return res.redirect('/USERS/');
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
    const bearerHeader = req.headers['authorization'];
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