const usersModel = require('../models/Users');
const usersCtrl = {}

usersCtrl.getData= async (req, res) => {
    res.json(await usersModel.find());
}

usersCtrl.insertData = async (req, res)=>{
    console.log(req.body);
    const {name, lastname, email, password, cpassword, phone, date, image}=req.body;
    console.log(email);
    if(password==cpassword){
        const emU = usersModel.findOne({email:email});
        if(emU){
            console.log('email in use.');
            //Redirect
            return res.redirect('/USERS');
        }
        let data = new usersModel({name, lastname, phone, email, date, image, password});
        data.password = await data.encryptPassword(password);
        console.log(data);
        await data.save();
        console.log('Datos guardados.');
        return res.redirect("/USERS/Register");
        //Redirect
    }else{
        console.log("Contraseñas no iguales.");
        return res.redirect("/USERS/Register");
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
       console.log("Errorr");
       return res.redirect('/USERS/');
   }
};


module.exports = usersCtrl;