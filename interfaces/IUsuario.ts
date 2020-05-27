import { Document } from 'mongoose';
export interface IUsuario extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): boolean;
}