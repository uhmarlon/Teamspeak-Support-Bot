/* Support Bot 0.1v
 * This file contains the core functions of the support script.
 * @author : UhMarlon
 * @copyright : http://nighttech.de
 */
const {
     TeamSpeak,
     QueryProtocol,
     TextMessageTargetMode,
     ChannelEdit,
     Codec
} = require("ts3-nodejs-library")
const config = require('./config');
TeamSpeak.connect({
     host: config.host,
     queryport: config.port,
     serverport: config.serverPort,
     protocol: QueryProtocol.RAW,
     username: config.user,
     password: config.pass,
     nickname: config.nick
}).then(async teamspeak => {
     console.log("Successful connected to server");
     teamspeak.whoami().then(whoami => {
          clientid = whoami.client_id;
          startchannel = whoami.client_channel_id;
     })
     teamspeak.on("close", async () => {
          console.log("disconnected, trying to reconnect...")
          await teamspeak.reconnect(-1, 1000)
          console.log("reconnected!")
     });
     Promise.all([
          teamspeak.registerEvent("server"),
          teamspeak.registerEvent("channel", 0),
          teamspeak.registerEvent("textserver"),
          teamspeak.registerEvent("textchannel"),
          teamspeak.registerEvent("textprivate")
     ]).then(() => {
          teamspeak.on('clientmoved', async event => {
               if (event.channel.cid === 0) return;
               if (event.channel.cid == config.supportchannelid) {
                    if (event.client.nickname.length > 28) {
                         teamspeak.clientKick(event.client.clid, 4, "Your name is too long. No support channel could be created.");
                         return
                    };
                    var createdChannel = await teamspeak.channelCreate("➜ Support • " + event.client.nickname, {
                         channel_order: config.supportchannelid,
                         channel_flag_temporary: 1,
                         channel_maxclients: 1,
                         channel_flag_maxclients_unlimited: 0,
                         channel_codec_quality: 10
                    });
                    teamspeak.clientMove(event.client.clid, createdChannel.cid);
                    teamspeak.clientMove(clientid, startchannel);
               }
          });

     });
});
