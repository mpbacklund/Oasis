import { Socket } from 'socket.io-client';
import * as dotenv from 'dotenv'

dotenv.config();

export class Device {
    private _socket: Socket | null = null; // initialize as null
    private _roomCode: string | null = null; // initialize as null

    get socketURL(): string {
        if(!process.env.SOCKET_URL) {
            throw new Error("SOCKET_URL is not defined in .env file");
        }
        return process.env.SOCKET_URL;
    }

    setSocket(socket: Socket): void {
        this._socket = socket;
    }

    setRoomCode(roomCode: string): void {
        this._roomCode = roomCode;
    }
}