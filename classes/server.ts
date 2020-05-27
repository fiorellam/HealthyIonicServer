import express from 'express'

export default class Server{
    public app: express.Application;
    public port: number = 3000;

    constructor(){
        this.app = express();
    }

    //Funcion que quiero llamar cuando se levante el servidor
    start(callback: Function){
        this.app.listen(this.port, callback);
    }
}