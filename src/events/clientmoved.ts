/* Support Bot v2
 * This file contains the clientmoved event of the support script.
 * @author : UhMarlon
 * @copyright : http://nighttech.de
 */
import { teamspeak,config,clientid,startchannel } from "../index"
if (config.supportsystem.active) {
  teamspeak.on('clientmoved', async event => {
    if (event.channel.cid == config.supportsystem.supportchannelid) {
      if (event.client.nickname.length > 28) {
        teamspeak.clientKick(event.client.clid, 4, "Your name is too long. No support channel could be created.");
        teamspeak.clientPoke(event.client.clid, "Your name is too long. No support channel could be created.")
        return
      };

      var createdChannel = await teamspeak.channelCreate(config.supportsystem.channelname.replace("%username%", event.client.nickname), {
        channel_order: config.supportsystem.supportchannelid,
        channel_description: config.supportsystem.channeldescription.replace("%username%", event.client.nickname),
        channel_flag_temporary: 1,
        channel_maxclients: 1,
        channel_flag_maxclients_unlimited: 0,
        channel_codec_quality: 10
      });

      const clients = await teamspeak.clientList()
      clients.forEach(client => {
        if (client.servergroups.includes(config.supportsystem.supnotifygroup)) {
          teamspeak.clientPoke(client.clid, config.supportsystem.supporterpoke.replace("%username%", event.client.nickname))
        }
      });
      teamspeak.clientMove(event.client.clid, createdChannel.cid);
      teamspeak.clientPoke(event.client.clid, config.supportsystem.userpoke)
      teamspeak.clientMove(clientid, startchannel);
    };
  });
}
