import { Socket } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3'

export abstract class Device extends EventEmitter {
    private _socket: Socket | null = null;
    private _roomCode: string | null = null;

    abstract connectToServer(): void;

    get socketURL(): string {
        const socketURL = "http://localhost:5173";
        if (!socketURL) {
            throw new Error("SOCKET_URL is not defined in .env file");
        }
        return socketURL;
    }

    // function which processes can subscribe to that emits events
    emitEvent(data:any): void {
        this.emit("event", data);
    }

    setSocket(socket: Socket): void {
        this._socket = socket;
        this.setupCommonListeners(socket); // Call to set up common listeners across all subclasses
    }

    setRoomCode(roomCode: string): void {
        this._roomCode = roomCode;
    }

    getSocket(): Socket | null {
        return this._socket;
    }

    getRoomCode(): string | null {
        return this._roomCode;
    }

    sendMessage(data: any): void {
        const socket = this.getSocket();
        if(socket) {
            socket.emit("roomMessage", this.getRoomCode(), data);
        }
    }

    private setupCommonListeners(socket: Socket): void {
        socket.on('connect', () => {
            console.log('Connected to the server (from Device).');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server.');
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        socket.on('roomMessage', (data) => {
            this.emitEvent(data);
        });
    }
}
