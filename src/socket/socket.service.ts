import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Payload } from 'src/common/dtos/payload.dto';

@Injectable()
export class SocketService {


    /**
     * @description 
     * almacenamos los usuarios conectados
     * 
     */
    private clients: {[key:string]: {socket: Socket; payload: Payload}} = {};


    /**
     * @description
     * Almacenamos el socket del usuario, identificando por el id generado
     */
    onConnection(socket: Socket, payload: Payload){
        this.clients[socket.id] = {socket: socket, payload: payload};
    }

    /**
     * @description
     * una vez desconectado , se elimina de la lista
     */
    onDisconnect(socket: Socket){
        delete this.clients[socket.id]
    }


    /**
     * @description
     * obtenemos un socket a traves de un id de un usuario
     */
    getSocket(id:number){
        //*recorremos la lista objeto valor
        for (let key in this.clients){
            //*retornamos el valor
            if(this.clients[key].payload.sub == id) return this.clients[key];
            //* o si no existe tal usuario,retornar nulo
            else return null;
        }
    }


}
