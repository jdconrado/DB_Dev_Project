const usersModel = require('../models/Users');
let requests = require('request');
const usersCtrl = {}

usersCtrl.getData= async (req, res) => {
    let {name,lastname,phone,email,DateOfBirth,ImageID, vendor} = await usersModel.findById(req.params.id);
    if(name){
        res.json({
            "result":"Successful.",
            "data": {
                name,
                lastname,
                phone,
                email,
                DateOfBirth,
                ImageID,
                vendor
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
        var {name, lastname, email, description, password, cpassword, phone, DateOfBirth, ImageID, vendor}=req.body;
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
            let data = new usersModel({name, lastname, phone, email, DateOfBirth, ImageID, password, vendor});
            data.password = await data.encryptPassword(password);
            await data.save();
            var js={"userId": data.id, "description": description};
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

usersCtrl.modify=async(req, res)=>{
    var {name, lastname, email, phone, DateOfBirth, ImageID} = req.body;
    let data = await usersModel.findById(req.params.id);
    await data.updateOne(
        {name: name},
        {strict: false});
    await data.updateOne(
        {lastname: lastname},
        {strict: false});    
    await data.updateOne(
        {email: email},
        {strict: false});
    await data.updateOne(
        {phone: phone},
        {strict: false});
    await data.updateOne(
        {DateOfBirth: DateOfBirth},
        {strict: false});
    await data.updateOne(
        {ImageId: ImageID},
        {strict: false});
    await data.save();
    res.json({
        "result":"Successful."
    });
}

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