<div align="center">

# Teamspeak-Support-Bot

A simple support channel management system.

</div>

[Twitter](https://twitter.com/1UhMarlon) |
[Steam](https://steamcommunity.com/profiles/76561198162177248) |
[UhMarlon#4062](https://discord.gg/kFEyQAt)

## Features

- Creates support subchannel

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
    "host": "localhost",
    "port": 10011,
    "serverPort": 9987,
    "user": "serveradmin",
    "pass": "pw",
    "nick": "Support System",
    "supportchannelid": "1000",
    "supnotifygroup": "2000"
}
```
### Step 4
- Launch ``` node index.js```

## License

[MIT](https://github.com/uhmarlon/FiveM-Teamspeak-Banner/blob/master/LICENSE)
