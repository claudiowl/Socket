import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';
//para que sea paquete por defecto
export default class Server{

    private static _instance:Server;

    public app: express.Application;
    public port: number;
    public io:socketIO.Server;
    //se utiliza para el socket por que xpress no es compatible 
    private httpServer:http.Server;

    private constructor(){
        
        this.app=express();
        this.port= SERVER_PORT;
        this.httpServer= new http.Server(this.app);
        //no se puede utilizar el app de express
        this.io=socketIO(this.httpServer);
        this.listenSockets();
    }
    public static get instance(){
        //se ocupa la misma instancia sino se crea una
        return this._instance||(this._instance= new this());
    }

    private listenSockets(){
        console.log('Escuchando conexiones de sockets');
        //para escuchar algun evento
        //tiende a crecer mucho por que lleva toda la logica de los eventos sin el folder socket
        this.io.on('connection',client=>{
        
            console.log('cliente conectado');
            //mensajes
            socket.message(client),
            //desconectar
            socket.disconnect(client);
         
        });
    }

    start(callback: Function){
        this.httpServer.listen(this.port, callback());
        
    }
}