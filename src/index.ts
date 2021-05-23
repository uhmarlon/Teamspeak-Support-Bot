/* Support Bot v2
 * This file contains the core functions of the support script.
 * @author : UhMarlon
 * @copyright : http://nighttech.de
 */
import * as config from "./config.json"; export { config };
import { TeamSpeak, QueryProtocol } from "ts3-nodejs-library";
export var startchannel: any; export var clientid: any;
import * as express from "express";
export const app = express();
export const PORT = process.env.PORT || config.general.webserverport;
export const teamspeak = new TeamSpeak({
  host: config.setup.host,
  queryport: config.setup.queryport,
  serverport: config.setup.serverport,
  protocol: QueryProtocol.RAW,
  username: config.setup.queryuser,
  password: config.setup.querypass,
  nickname: config.setup.nickname,
  keepAlive: true
});

app.listen(PORT, () => {});

teamspeak.on("ready", async () => {
  console.log("⚡️TeamSpeak³ Bot Online");
}).on('error', (err: any) => console.error(err));

teamspeak.whoami().then(whoami => {
  clientid = whoami.clientId;
  startchannel = whoami.clientChannelId;
});

teamspeak.on("close", async () => {
  console.log("⚠️disconnected, trying to reconnect...")
  await teamspeak.reconnect(-1, 1000);
  console.log("🕯️reconnected!")
});

async function usercounter() : Promise<any> {
  const [serverinfo] = await Promise.all([teamspeak.serverInfo(), teamspeak.whoami()])
  var user = [];
  let clients = await teamspeak.clientList({ clientType: 0 })
  clients.forEach((client) => {
    user.push(client.nickname);
  })
    const infostuff = ({
    "data": [{
        "status": serverinfo.virtualserverStatus,
        "name": serverinfo.virtualserverName,
        "port": serverinfo.virtualserverPort,
        "usercount": serverinfo.virtualserverClientsonline,
        "slots": serverinfo.virtualserverMaxclients,
        "ping": serverinfo.virtualserverTotalPing,
        "banner": serverinfo.virtualserverHostbannerGfxUrl,
        "users": user
    }],
        "requested_at": Date.now()
    });
  return infostuff;
}

app.get('/', async function(_req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const teamspeakjson = usercounter();
  return res.send(await teamspeakjson);
})

import './events/clientconnect';
import './events/textmessage';
import './events/clientmoved';
