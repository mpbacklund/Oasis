import { Socket, io } from 'socket.io-client';
import { Device } from './device'


export class Host extends Device {
    connectToServer(): void {
        const socket = io(this.socketURL);
        this.setSocket(socket);

        socket.on("hostMessage", (client, message) => {
            // do something
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