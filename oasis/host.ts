import { Socket, io } from 'socket.io-client';
import { Device } from './device'


class Host extends Device {
    connectToServer(): void {
        this.setSocket(io(this.socketURL));
    }
}