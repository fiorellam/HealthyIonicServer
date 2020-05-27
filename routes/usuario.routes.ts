import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";

const userRoutes = Router();

userRoutes.get('/prueba', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien en prueba healthy app'
    })
});

userRoutes.post('/create', (req: Request, res: Response) => {

    const user ={
        name     : req.body.name,
        email    : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)
    }

    // Guardar en la bd
    Usuario.create(user).then( userDB => { //en el then se recibe al usuario de base de datos

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
    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    })
});

userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) throw err;

        if(!userDB){
            return res.json({
                ok: false,
                message: 'Usuario/contraseña no son correctos'
            });
        }

        if(userDB.comparePassword(body.password)){
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
        } else {
            return res.json({
                ok: false,
                message: 'Usuario/contraseña no son correctos ***'
            })
        }
    });
})
 function generateToken(userDB : any, res: any){
    const userToken = Token.getJwtToken({
        _id: userDB._id,
        name: userDB.name,
        email: userDB.email
    });
    res.json({
        ok: true,
        token: userToken
    });
}
export default userRoutes;