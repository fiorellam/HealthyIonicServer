"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Rutas de mi app
server.app.use('/user', usuario_routes_1.default);
//Conectar a BD
mongoose_1.default.connect('mongodb://localhost:27017/healthyApp', { useNewUrlParser: true, useCreateIndex: true }, //todo esto devulve un callback
(err) => {
    if (err)
        throw err;
    console.log('Base de datos Lista');
});
//Levantar express
server.start(() => {
    console.log(`Servidos corriendo en puerto ${server.port}`);
});
