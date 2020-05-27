import { Schema, model } from 'mongoose';
import { IUsuario } from '../interfaces/IUsuario';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El correo es necesario']
    }, 
    password: {
        type: String,
        required: [ true, 'La contraseña es necesaria']
    }
});

usuarioSchema.method('comparePassword', function(password: string = '') : boolean {
    if(bcrypt.compareSync(password, this.password)){
        return true;
    } else {
        return false;
    }
})

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);