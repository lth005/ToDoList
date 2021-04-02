//Importamos las librerias que serán necesarias
const express = require('express');
const router = express.Router();
const http = require('http');
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY || "prew";

require('dotenv').config();
const servidor = 'localhost';
const usuario = 'root';
const clave = 'password';
const baseDatos = 'todolist';

//Creamos la conexión a la base de datos¨
console.log(process.env.HOST);

var con = mysql.createPool({
    host: servidor,
    user: usuario,
    password: clave,
    database: baseDatos,

});

//
router.get('/get_tareas', (req, res, next) => {
    var query = 'select * from tareas where id_estado_tarea = 1';
    con.query(query, (err, result, field) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result)
        }
    });
});

router.post('/insert_tarea', (req, res, next) => {
    var query = 'insert into tareas (titulo, descripcion, id_estado_tarea) values (?,?,?);';
    var values = [
        req.body.titulo,
        req.body.descripcion,
        req.body.id_estado_tarea
    ];
    con.query(query, values, (err, result, field) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result)
        }
    });
});

router.put('/update_tarea', (req, res, next) => {
    var query = 'update tareas set titulo=?, descripcion=? where id_tarea=?';
    var values = [req.body.titulo,
        req.body.descripcion,
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
    var values = [
        req.body.nombre_usuario,
        req.body.correo_electronico,
        req.body.contrasenia,
        req.body.id_rol,
        req.body.id_estado

    ];

    var query = 'insert into usuarios (nombre_usuario, correo_electronico, contrasenia, id_rol, id_estado) values (?,?,md5(?),?,?);';
    con.query(query, values, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(200).send();
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

router.post('/login', (req, res, next) => {
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
})

/*//APIs CRUD para mantenimiento de Vehiculos
router.get('/get_vehiculos', (req, res, next) => {
    var query = 'select * from vehiculos';
    con.query(query, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

router.get('/get_vehiculo', (req, res, next) => {
    var query = 'select * from vehiculos where placa = ?';
    var values = [req.query.placa];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

router.post('/insert_vehiculo', (req, res, next) => {
    var query = 'INSERT INTO Vehiculos (placa, color, marca, modelo) values (?, ?, ?, ?)';
    var values = [req.body.placa,
                  req.body.color,
                  req.body.marca,
                  req.body.modelo];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

router.put('/update_vehiculo', (req, res, next) => {
    var query = 'Update Vehiculos set color=?, marca=?, modelo=? WHERE placa = ?';
    
    var values = [req.body.color,
                  req.body.marca,
                  req.body.modelo,
                  req.body.placa];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

router.delete('/delete_vehiculo', (req, res, next) => {
    var query = 'delete from vehiculos.vehiculos where placa = ?';
    
    var values = [req.query.placa];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

//APIs para Manejo de usuarios

router.get('/get_usuarios', (req, res, next) => {
    var query = 'select * from usuarios';
    con.query(query, (err, result, fields) => {
        if(err) {
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
});

router.post('/insert_usuario', (req, res, next) => {
    var user = {
        username: req.body.username,
        password: req.body.password
    };
    const create_user = (user) => {
        var query = "INSERT INTO usuarios (username, password) VALUES (?) ";
        con.query(query, [Object.values(user)], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                res.status(200).send();
            }
        });
    };
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        create_user(user);
    });
});

router.post('/login', (req,res,next) =>{
    var user = {
        username: req.body.username,
        password: req.body.password
    };
    const get_token = (user) => {
        var query = "SELECT USERNAME, PASSWORD FROM usuarios WHERE username = ?"
        con.query(query, [user.username], (err, result, fields) => {
            if (err || result.length == 0) {
                console.log(err);
                res.status(400).json({message:"Usuario o contrasenia Incorrectos"});
            } else {
                bcrypt.compare(user.password,result[0].PASSWORD, (error, isMatch)=> {
                    if (isMatch){
                        var token = jwt.sign({userId: result[0].id}, secret_key);
                        res.status(200).json({token});
                    }else if (error){
                        res.status(400).json(error);
                    }else {
                        res.status(400).json({message: "Usuario o contrasenia Incorrectos"});
                    }
                });
            }
        });
    }
    get_token(user);

});*/


module.exports = router;