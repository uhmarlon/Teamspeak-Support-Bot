<div align="center">

# Teamspeak-Support-Bot

a small bot that simplifies a few things on the teamspeak server

</div>

[Twitter](https://twitter.com/1UhMarlon) |
[UhMarlon#4062](https://discord.gg/kFEyQAt)

## Features

- Created under channel from the support room
- Welcome message
- Verification command with group that you get
- a Web API with some basic information

## Installation

> You will need <a href="https://nodejs.org/en/">NodeJS</a>.
### Step 1
- Clone this repo to your local machine
```
git clone https://github.com/uhmarlon/Teamspeak-Support-Bot.git
```
### Step 2
- Install packages
```
npm install
```
### Step 3
- Fill in all the information in the config.json
```json
{
  "setup":{
     "host": "localhost",
     "queryport": 10011,
     "serverport": 9987,
     "queryuser": "serveradmin",
     "querypass": "querypassword",
     "nickname": "Support x System"
  },
  "general":{
     "projectname": "UhMarlonBot",
     "botprefix_up": "\n\n\n »-----------------=======[color=#27b7ca][[/color]» [B]Bot[/B] «[color=#27b7ca]][/color]=======-----------------«\n\n",
     "botprefix_down": "\n\n »-----------------=======[color=#27b7ca][[/color]» [B]Bot[/B] «[color=#27b7ca]][/color]=======-----------------«",
     "webserverport": 2691
  },
  "supportsystem":{
     "active": true,
     "supportchannelid": "33",
     "supnotifygroup": "48",
     "channelname": "➜ Support • %username%",
     "channeldescription": "[center][COLOR=#2f4f4f][hr][size=17][b]Support case from /n %username% [COLOR=#aa0000]",
     "userpoke": "[B][color=#27b7ca][SUPPORT-System][/color][/B] Please be patient for a moment!",
     "supporterpoke": "%username% is in the [color=#a9102f]support-area[/color]!"
  },
  "welcomemessage":{
     "active": true,
     "message": "     » Welcome back [color=#27b7ca] %username% [/color] at [B][color=#27b7ca]%projectname%[/color][/B]!\r"
  },
  "verifysystem":{
     "active": true,
     "verfiyovergroup": "22",
     "verifygroup": "23",
     "verifymessage": "     » Use [color=#27b7ca][B]!verify[/B][/color] to verify yourself!\r",
     "whenverified": "     » There are [color=#27b7ca][B] %clientsonline% users[/B][/color] on our Teamspeak right now!\r"
  }
}
```
### Step 4
- Launch ``` npm run-script start```

## License

[MIT](https://github.com/uhmarlon/FiveM-Teamspeak-Banner/blob/master/LICENSE)
