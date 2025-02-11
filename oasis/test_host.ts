import { Host } from "./host";
import { Player } from "./player";
import { gameModes } from '../gameMode';

const host = new Host();
const player = new Player();
host.connectToServer();

// Wait a bit, then create a room
setTimeout(() => {
    console.log("creating room...")
    host.createRoom(gameModes.BANK);
}, 2000);

host.on("event", (data) => {
    console.log(data);
});

host.emitEvent("event happened")
