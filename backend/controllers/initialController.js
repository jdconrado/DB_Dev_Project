// Los controladores ayudan a definir los metodos que vamos a usar en nuestras rutas
// lo que sirve para no tener todas las definiciones de las funciones en sus rutas correspondientes.

const intModel = require('../models/initialModel');
const initialCtrl = {};

initialCtrl.getData = async (req,res) => {
    res.json(await intModel.find()); // Le está pidiendo a la tabla/model initialModel todos los datos que tiene guardados
    // y los envia como respuesta de la solicitud
};

initialCtrl.insertData = async (req, res)=>{
    console.log(req.body); //Muestra los datos recibidos por el cliente en consola, estos deben seguir el modelo definido o arrojará un error
    let data = new intModel(req.body); // Esto es lo que arroja error sino sigue el modelo correcto
    await data.save();
    res.json({
        'status': 'Datos guardados.'
    });
};

initialCtrl.getMatchingPhone = async (req, res)=>{
    let dataThatMatches = await intModel.find({phone:req.params.phone}); //Obtiene la información en la tabal que concuerde con el telefono puesto
    console.log(dataThatMatches);
};

initialCtrl.editDataOfMatchingPhone = async (req, res)=>{

};

initialCtrl.deleteDataOfMatchingPhone = async (req, res)=>{
    await intModel.remove({phone:req.params.phone})
    console.log('Eliminado.')
};

module.exports = initialCtrl;