//Importamos las librerias que serán necesarias
const express = require('express');
const router = express.Router();
const http = require('http');
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const secret_key = process.env.SECRET_KEY || "prew";
require('dotenv').config();
const servidor = 'localhost';
const usuario = 'root';
const clave = 'emma63194';
const baseDatos = 'todolist';

//Creamos la conexión a la base de datos¨
console.log(process.env.HOST);

var con = mysql.createPool({
    host: servidor,
    user: usuario,
    password: clave,
    database: baseDatos,

});

//----------------------Verificar Existencia del correo----------------------
router.post('/get_correo',(req,res,next)=>{
    var query = 'select * from usuarios where correo_electronico= ?  ;';
    var values= [req.body.email];
  
    con.query(query,values, (err, result, field) => {
        if (err){

            next(err);
        } else {

            res.status(200).json(result);
        }
    });
});

///---------------------Clave usuario-----------------

router.put('/update_clave',(req,res,next)=>{
    
    var query = 'Update usuarios SET clave= "'+req.body.clave +'" Where correo_electronico= "'+req.body.email+'";';
    con.query(query,  (err, result, field) => {
        if(err) {
            next(err);
        } else {
            
            if(result.changedRows==0){
               
                console.log("ERROR");
            }else{
                mail = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    auth: {
                      user: 'astaclover103@gmail.com',
                      pass: 'emma63194'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                var mailOptions = {
                    from: 'astaclover103@gmail.com',
                    to: req.body.email,
                    subject: 'Codigo de recuperacion de cuenta',
                    text: 'El codigo para recuperacion de la cuenta es: '+req.body.clave
                };
                
                mail.sendMail(mailOptions, function(error, info){

                    if (error) {
                        console.log('Email error: ' + error);
                        res.status(200).json(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).json(info.response);

                    }
                });

            }
            

        }
    });

});

router.put('/update_contrasenia',(req,res,next)=>{
    var query = ' Update usuarios set contrasenia=md5(?) where correo_electronico=?;';
    var values= [req.body.contrasenia,
                req.body.email];
  
    con.query(query,values, (err, result, field) => {
        if (err){

            next(err);
        } else {

            res.status(200).json(result);
        }
    });
});    
    
//----------------------Verificar Clave------------------------
router.post('/get_clave',(req,res,next)=>{
    var query = 'select * from usuarios where clave= ?  ;';
    var values= [req.body.clave];
  
    con.query(query,values, (err, result, field) => {
        if (err){

            next(err);
        } else {

            res.status(200).json(result);
        }
    });
});

//---------------------------------------------
router.post('/get_tareas', (req, res, next) => {
    var query = "select t.id_tarea, t.titulo, t.descripcion from tareas t inner join listados l on t.id_tarea = l.id_tarea inner join usuarios u on u.id_usuario = l.id_usuario where t.id_estado_tarea = 1 and u.correo_electronico = '" + req.body.correo_electronico + "';";
    var values = [req.body.correo_electronico];
    con.query(query, values, (err, result, field) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result)
        }
    });
});

router.post('/get_tareas_terminadas', (req, res, next) => {
    var query = "select t.id_tarea, t.titulo, t.descripcion from tareas t inner join listados l on t.id_tarea = l.id_tarea inner join usuarios u on u.id_usuario = l.id_usuario where t.id_estado_tarea = 2 and u.correo_electronico = '" + req.body.correo_electronico + "';";
    var values = [req.body.correo_electronico];
    con.query(query, values, (err, result, field) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result)
        }
    });
});

router.post('/insert_tarea', (req, res, next) => {
    var query = 'insert into tareas (titulo, descripcion, id_estado_tarea, fecha) values (?,?,?,now());';
    var values = [
        req.body.titulo,
        req.body.descripcion,
        req.body.id_estado_tarea,
    ];
    con.query(query, values, (err, result, field) => {
        if (err) {
            next(err);
        } else {
            var query2 =  'select id_tarea from tareas Order by fecha desc LIMIT 1;';
            con.query(query2, [], (err2, result2, field2) => {
                if (err2) {
                    next(err2);
                } else {
                    var query3 = 'insert into listados (id_usuario,id_tarea,fecha_realizado) values (?,?,now());';
                    var values3 = [
                        req.body.id_usuario,
                        result2[0].id_tarea
                    ];
                    con.query(query3, values3, (err3, result3, field3) => {
                        if (err3) {
                            next(err3);
                        } else {
                            res.status(200).json(result3);
                        }
                    });
                }
            });
        }
    });
});

router.put('/update_tarea', (req, res, next) => {
    var query = 'update tareas set titulo=?, descripcion=?, id_estado_tarea=? where id_tarea=?';
    var values = [req.body.titulo,
        req.body.descripcion,
        req.body.id_estado_tarea,
        req.body.id_tarea
    ];
    con.query(query, values, (err, result, field) => {
        if (err) {
            console.log(req.body.id_tarea + req.body.titulo + req.body.descripcion);
            next(err);
        } else {
            console.log(req.body);
            res.status(200).json(result)
        }
    });
});

router.put('/delete_tarea', (req, res, next) => {
    var query = 'update tareas set id_estado_tarea=? where id_tarea=?';
    var values = [req.body.id_estado_tarea,
        req.body.id_tarea
    ];
    con.query(query, values, (err, result, field) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result)
        }
    });
});

router.get('/get_usuarios', (req, res, next) => {
    var query = 'select * from usuarios where id_estado = 1';
    con.query(query, (err, result, field) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result)
        }
    });
});

router.post('/insert_usuario', (req, res, next) => {

    var query1='SELECT * FROM usuarios WHERE correo_electronico=?';
    var values1=[req.body.correo_electronico];
    con.query(query1, values1, (err, result1, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if(result1.length==0){
                var values2 = [
                    req.body.nombre_usuario,
                    req.body.correo_electronico,
                    req.body.contrasenia,
                    req.body.id_rol,
                    req.body.id_estado
            
                ];
                var query2 = 'insert into usuarios (nombre_usuario, correo_electronico, contrasenia, id_rol, id_estado) values (?,?,md5(?),?,?);';
                con.query(query2, values2, (err, result2, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    } else {
                        res.status(200).send();
                    }
                });
            }else{
                console.log("CORREO YA EXISTENTE"); 
                console.log(err);
                res.status(500).send();
            }
            
        }
    });
   
});

router.put('/update_contrasenia', (req, res, next) => {
    var contra = [
        { contrasenia: req.body.contrasenia },
        { id_usuario: req.body.id_usuario }
    ];
    var values = [req.body.contrasenia,
        req.body.id_usuario
    ];

    var contrasenia = req.body.contrasenia;
    var id = parseInt(req.body.id_usuario);

    var query = 'update usuarios set contrasenia=md5(?) where id_usuario=?;';
    console.log(id + " " + contrasenia);
    con.query(query, values, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(200).send();
        }
        console.log(result + " " + query);
    });
});

/*router.post('/login', (req, res, next) => {
    var values = [req.body.correo_electronico, req.body.contrasenia];

    var query = "select * from usuarios where correo_electronico = ? and contrasenia = md5(?)";
    con.query(query, values, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(200).json(result);
            if (result.length > 0) {
                console.log("El usuario " + req.body.correo_electronico + " ha iniciado sesion.");
                console.log(req.body);
            } else {
                console.log("Error .");
                console.log(req.body);
            }
        }
    });
});*/
router.post('/login', (req, res, next) => {
    var values = [req.body.correo_electronico, req.body.contrasenia];
   

    const get_token =(values) => {

        var query = "select * from usuarios where correo_electronico = ? and contrasenia = md5(?)";
        
        con.query(query, values,async (err, result, fields) => {
            
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                if (result.length > 0) {

                    console.log("El usuario " + req.body.correo_electronico + " ha iniciado sesion.");
                    console.log(req.body);
                    var token =await jwt.sign({correo_electronico: result[0].correo_electronico}, secret_key);
                    res.status(200).json({token,id: result[0].id_usuario});
                } else {
                    console.log("Error .");
                    console.log(req.body);
                    res.status(500).send();
                }
            }
        });
    }
    get_token(values);
});

router.get('/get_estado_tarea', (req, res, next) => {
    var query = 'SELECT * FROM estado_tareas';
    con.query(query, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});


//---------------------------------------------Ultima tarea-----------------------------------------
router.get('/get_tarea',(req,res,next)=>{
    var query = 'select id_tarea from tareas Order by id_tarea desc LIMIT 1  ;';
    var values= [req.body.email];

    con.query(query,values, (err, result, field) => {
        if (err){

            next(err);
        } else {

            res.status(200).json(result);
        }
    });
});
//---------------------------------------------Insert listado------------------------------------------
router.post('/insert_listado', (req, res, next) => {
    var query = 'insert into listados (id_usuario,id_tarea,fecha_realizado) values (?,?,CURDATE());';
    var values = [
        req.body.id_usuario,
        req.body.id_tarea,
        req.body.fecha
    ];
    con.query(query, values, (err, result, field) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result)
        }
    });
});



module.exports = router;