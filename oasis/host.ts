import { Socket, io } from 'socket.io-client';
import { Device } from './device'
import { GameMode } from '../gameMode';

export class Host extends Device {
    private _players = new Map();

    connectToServer(): void {
        const socket = io(this.socketURL);
        this.setSocket(socket);

        socket.on("clientMessage", (client, message) => {
            this.emitEvent([client, message])
        });

        socket.on("playerConnected", (playerID, playerName) => {
            // TODO: add some validation here to handle reconnections
            // probably just add the second part of the map a list with the playerName and connection status
            this._players.set(playerID, playerName);
        });
    }

    createRoom(gameType: GameMode): void {
        const socket = this.getSocket();
        if(socket) {
            socket.emit('createRoom', gameType.name, gameType.players);
        }
        else {
            console.error("socket not connected");
        }
    }
}