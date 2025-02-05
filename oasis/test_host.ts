import { Host } from "./host";
import { gameModes } from '../gameMode';

const host = new Host();
host.connectToServer();

// Wait a bit, then create a room
setTimeout(() => {
    host.createRoom(gameModes.BANK);
}, 2000);