/* Support Bot v2
 * This file contains the textmessage event of the support script.
 * @author : UhMarlon
 * @copyright : http://nighttech.de
 */
import { teamspeak,config } from "../index"
if (config.verifysystem.active) {
  teamspeak.on("textmessage", tm => {
    if (tm.msg == "!verify") {
      if (tm.invoker.servergroups.includes(config.verifysystem.verifygroup)) {
        teamspeak.sendTextMessage(tm.invoker.clid, 1, "    \u00bb You are already [color=#C42627][B]verified[/B][/color]!");
      } else {
        teamspeak.sendTextMessage(tm.invoker.clid, 1, "    \u00bb Loading Database...");
        teamspeak.sendTextMessage(tm.invoker.clid, 1, "    \u00bb You have been successfully [color=#618165][B]verified[/B][/color]!");
        teamspeak.serverGroupAddClient(tm.invoker.databaseId, config.verifysystem.verifygroup);
        if (config.verifysystem.verfiyovergroup.length > 0)
        teamspeak.serverGroupAddClient(tm.invoker.databaseId, config.verifysystem.verfiyovergroup);
      }
    }
  });
}
