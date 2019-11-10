const usersModel = require('../models/Users');
const usersCtrl = {}

usersCtrl.getData= async (req, res) => {
    res.json(await usersModel.find());
}

usersCtrl.insertData = async (req, res)=>{
    console.log(req.body);
    var {name, lastname, email, password, cpassword, phone, DateOfBirth, ImageID}=req.body;
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
        console.log('Datos guardados.');
        return res.redirect("/USERS/");
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
        console.log("Done");
        return res.redirect('/USERS/');
    }else{
        console.log("Error");
        return res.redirect('/USERS/');
    }
   }else{
       console.log("Error");
       return res.redirect('/USERS/');
   }
};


module.exports = usersCtrl;