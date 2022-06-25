import { controllers } from './controllers';
import {httpServer} from './src/http_server/index';
import 'dotenv/config'

import { WebSocketServer, WebSocket } from 'ws';
import { commands, TCommands } from "./commands";

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const WEBSOCKET_SERVER_PORT = process.env.WEBSOCKET_SERVER_PORT || 4000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({port: WEBSOCKET_SERVER_PORT as number})

wss.on('connection', (ws) => {

  const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('readable', async () => {
    let data = '';
    let chunk = ' ';

    while (chunk) {
      data += duplex.read();
      chunk = duplex.read()
    }

    const [command, ...externalData] = data.split(' ')

    try {
      if (!commands[command]) {
        return
      }

      if (command === 'prnt_scrn') {
        const res = controllers[command]();
        duplex.write(`${command} ${res.payload}`, () => { console.log(`${command} success!`) });
        return
      }

      const res = controllers[command as TCommands](externalData);
      duplex.write(`${command} '${res.x}px,${res.y}px`, () => { console.log(`${command} success!`) });
    } catch(e) {
      console.log(e)
    }

  })
})