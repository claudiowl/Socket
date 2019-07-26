import { Socket } from 'socket.io';
import socketIO from 'socket.io';

//funciones que ocupara fuera export
export const disconnect=(client:Socket)=>{

    client.on('disconnect',()=>{
        console.log('cliente desconectado');
    })
}

//escucha los msj
export const message=(client:Socket,io:socketIO.Server)=>{

    client.on('message',(payload:{de:string,cuerpo:string})=>{
        console.log('msj recibido',payload);
        io.emit('new-message',payload)
    })
   
}


