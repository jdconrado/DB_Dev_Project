const usersModel = require('../models/Users');
let requests = require('request');
const usersCtrl = {}

usersCtrl.getData= async (req, res) => {
    let {name,lastname,phone,email,DateOfBirth,ImageID} = await usersModel.findById(req.params.id);
    if(name){
        res.json({
            "result":"Successful.",
            "data": {
                name,
                lastname,
                phone,
                email,
                DateOfBirth,
                ImageID
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
        var {name, lastname, email, password, cpassword, phone, DateOfBirth, ImageID, vendor}=req.body;
        
        DateOfBirth = new Date();
        ImageID = "";
        if(password==cpassword){
            const emU = await usersModel.findOne({email: email});
            if(emU){
                console.log('Email in use.');
                return res.json({
                    "result":"error.",
                    "error": "Email en uso."
                });
            }
            let data = new usersModel({name, lastname, phone, email, DateOfBirth, ImageID, password});
            data.password = await data.encryptPassword(password);
            await data.save();
            var js={"userId": data.id};
            if(vendor == true){
                requests.post('http://localhost:8080/USERS/VENDORS/create', {json: js});
            }else{
                requests.post('http://localhost:8080/USERS/CLIENTS/create', {json: js});
            }
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

module.exports = usersCtrl;