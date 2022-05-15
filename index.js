// Importations...
"use strict";
require("dotenv").config();
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

// Trying to launch the bot like a "client script"...
console.log("Launching LZC Discord Bot...");

// Create the client class to create the connection...
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
});

// Access to the special and SECRET Discord Bot Token...
// It takes the token from the file "secrets.env"...
const TOKEN = process.env.TOKEN;

// When the client is ready, run this code (only once)...
client.once("ready", () =>
{
    // Message in console. When the bot is correctly connected...
	console.log("LZC Discord Bot ready!");

    // Discord bot display for "Playing ---"...
	client.user.setActivity("LZC 😎");
});

// Login to Discord with your clien's token...
client.login(TOKEN);