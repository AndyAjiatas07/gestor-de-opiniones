//Importaciones
import dotenv from 'dotenv';
import { initServer } from "./configs/app.js";

//configurar variables de entorno
dotenv.config();
//errores no capturados
process.on(`uncaughtException`,(error)=>{
    console.log(error);
    process.exit(1);
});
//Promesas rechazadas o no manejadas
process.on(`unhandledRejection`,(reason, promise)=>{
    console.log(reason, promise);
    process.exit(1);
});

//Inicialización del servidor
console.log(`Iniciando servidor de OpinaNet ...`);
initServer();