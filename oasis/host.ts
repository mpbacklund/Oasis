import { io } from 'socket.io-client';
import { Device } from './device'
import { GameMode } from '../gameMode';

export class Host extends Device {
    private _players = new Map<string, string>();

    connectToServer(): void {
        const socket = io(this.socketURL);
        console.log(this.socketURL);
        this.setSocket(socket);
        console.log(socket);

        socket.on("roomCreated", (roomCode) => {
            this.setRoomCode(roomCode);
            this.emitEvent({message: "roomCreated", roomCode: roomCode})
        });

        socket.on("connected", () => {
            console.log("connected")
        });

        socket.on("clientMessage", (client, messageData) => {
            this.emitEvent({message: "clientMessage", sender: client, event: messageData})
        });

        socket.on("playerConnected", (playerID, playerName) => {
            // TODO: add some validation here to handle reconnections
            // probably just add the second part of the map a list with the playerName and connection status
            this._players.set(playerID, playerName);
            this.emitEvent({message: "playerConnected", playerName: playerName, playerID: playerID});
        });
    }

    getPlayers(): Map<string, string> {
        return this._players;
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