"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const userRoutes = express_1.Router();
userRoutes.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien en prueba healthy app'
    });
});
userRoutes.post('/create', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 8)
    };
    // Guardar en la bd
    usuario_model_1.Usuario.create(user).then(userDB => {
        generateToken(userDB, res);
        // const userToken = Token.getJwtToken({
        //     _id: userDB._id,
        //     name: userDB.name,
        //     email: userDB.email
        // });
        // res.json({
        //     ok: true,
        //     token: userToken
        // });
        // res.json({
        //     ok:true,
        //     user: userDB //si se logra crear el usuario de base de datos mi user = userDB
        // })
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                message: 'Usuario/contraseña no son correctos'
            });
        }
        if (userDB.comparePassword(body.password)) {
            generateToken(userDB, res);
            // const userToken = Token.getJwtToken({
            //     _id: userDB._id,
            //     name: userDB.name,
            //     email: userDB.email
            // });
            // res.json({
            //     ok: true,
            //     token: userToken
            // });
        }
        else {
            return res.json({
                ok: false,
                message: 'Usuario/contraseña no son correctos ***'
            });
        }
    });
});
function generateToken(userDB, res) {
    const userToken = token_1.default.getJwtToken({
        _id: userDB._id,
        name: userDB.name,
        email: userDB.email
    });
    res.json({
        ok: true,
        token: userToken
    });
}
exports.default = userRoutes;
