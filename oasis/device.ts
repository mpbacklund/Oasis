import { Socket } from 'socket.io-client';
import * as dotenv from 'dotenv';

dotenv.config();

export abstract class Device {
    private _socket: Socket | null = null;
    private _roomCode: string | null = null;
    private 

    abstract connectToServer(): void;

    get socketURL(): string {
        if (!process.env.SOCKET_URL) {
            throw new Error("SOCKET_URL is not defined in .env file");
        }
        return process.env.SOCKET_URL;
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

        socket.on('roomCode', (roomCode) => {
            this.setRoomCode(roomCode);
            console.log('Room code received:', roomCode);
        });
    }
}
