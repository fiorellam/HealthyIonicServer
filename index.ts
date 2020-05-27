import Server from "./classes/server";
import userRoutes from "./routes/usuario.routes";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();

//Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json());

//Rutas de mi app
server.app.use('/user', userRoutes);

//Conectar a BD
mongoose.connect('mongodb://localhost:27017/healthyApp', { useNewUrlParser: true, useCreateIndex: true },  //todo esto devulve un callback
    (err) => {
        if(err) throw err;
        console.log('Base de datos Lista');
    }
)

//Levantar express
server.start(() => {
    console.log(`Servidos corriendo en puerto ${server.port}`);
});