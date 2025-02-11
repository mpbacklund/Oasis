import { Socket, io } from 'socket.io-client';
import { Device } from './device'
import { EventEmitter } from 'events'


export class Player extends Device {
    connectToServer(): void {
        const socket = io(this.socketURL);
        this.setSocket(socket);
        
        // when we get a message, emit this event using the event system
        socket.on("hostMessage", (message) => {
            this.emitEvent(message)
        });
    }

    joinRoom(roomCode: string, playerName: string): void {
        const socket = this.getSocket();
        if(socket) {
            socket.emit("joinRoom", roomCode, playerName);
        }
        else {
            console.error("socket not connected");
        }
    }
}