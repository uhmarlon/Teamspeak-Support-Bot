/* Support Bot v2
 * This file contains the clientconnect event of the support script.
 * @author : UhMarlon
 * @copyright : http://nighttech.de
 */
import { teamspeak,config } from "../index"

if (config.welcomemessage.active || config.verifysystem.active) {
  teamspeak.on("clientconnect", async cc => {
    const [serverinfo] = await Promise.all([teamspeak.serverInfo()])
    var useronline: any = serverinfo.virtualserverClientsonline;
    if (config.verifysystem.active) {
      if (cc.client.servergroups.includes(config.verifysystem.verifygroup)) {
        teamspeak.sendTextMessage(cc.client.clid, 1, config.general.botprefix_up +
          config.welcomemessage.message.replace('%username%', cc.client.nickname).replace('%projectname%', config.general.projectname) + "\n" +
          config.verifysystem.whenverified.replace('%clientsonline%', useronline) +
          config.general.botprefix_down);
      } else {
        teamspeak.sendTextMessage(cc.client.clid, 1, config.general.botprefix_up +
          config.welcomemessage.message.replace('%username%', cc.client.nickname).replace('%projectname%', config.general.projectname) + "\n" +
          config.verifysystem.verifymessage +
          config.general.botprefix_down);
    }} else {
      teamspeak.sendTextMessage(cc.client.clid, 1, config.general.botprefix_up +
        config.welcomemessage.message.replace('%username%', cc.client.nickname).replace('%projectname%', config.general.projectname) +
        config.general.botprefix_down);
    }
  });
}
