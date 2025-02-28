import { io } from 'socket.io-client';
import { Device } from './device'
import { GameMode } from '../gameMode';

export class Host extends Device {
    private _players = new Map<string, string>();

    connectToServer(): void {
        const socket = io(this.socketURL);
        this.setSocket(socket);

        socket.on("roomCreated", (roomCode) => {
            this.setRoomCode(roomCode);
            this.emitEvent({message: "roomCreated", roomCode: roomCode})
        });

        socket.on("clientMessage", (client, messageData) => {
            this.emitEvent({message: "clientMessage", sender: client, event: messageData})
        });

        socket.on("playerJoined", (socketID, playerName, _) => {
            this._players.set(socketID, playerName);
            this.emitEvent({message: "playerConnected", playerName: playerName, playerID: socketID})
        })
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

    kickPlayer(playerID: string): void {
        const socket = this.getSocket();
        if(socket) {
            socket.emit('kickPlayer', playerID, this.getRoomCode())
        }
    }
}