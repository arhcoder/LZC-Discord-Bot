// Importations...
"use strict";
require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const backend = require("./api/backend");
const variables = require("./config/variables");
const constants = require("./config/constants");
const newMember = require("./functions/newMember");
const countMessage = require("./functions/countMessage");
const countCommand = require("./functions/countCommand");
const checkAchievements = require("./functions/checkAchievements");




// Trying to launch the bot like a "client script"...
console.log("Launching LZC Discord Bot...");

// Create the client class to create the connection...
const client = new Discord.Client(
{
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
});

// Access to the special and SECRET Discord Bot Token...
// It takes the token from the file "secrets.env"...
const TOKEN = process.env.TOKEN;

// When the client is ready, run this code (only once)...
client.once("ready", () =>
{
    // Save on the database all the members on the guild...
    console.log("Refreshing database...");
    const guild = client.guilds.cache.get(constants.lzcGuildID);

    // Fetch and get the list of members...
    guild.members.fetch().then(members =>
    {
        // Loop through every member...
        members.forEach(member =>
        {
            // Saves the member on the database...
            newMember.run(member.user.id);
        });
    });
    console.log("Database refreshed!");

    // Getting commands colection...
    const slashCommands = client.slashCommands.map(slash => slash);
    guild.commands.set(slashCommands);
    console.log("Commands collected!");

    // Message in console. When the bot is correctly connected...
	console.log("LZC Discord Bot ready!\n");

    // Discord bot display for "Playing ---"...
	client.user.setActivity("LZC 😎");
});

// Running app backend...
backend.run();



// Bot prefix to call commands...
const prefix = "lzc";

// Gets the commands collection to do a handler...
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./commands/text/").filter(file => file.endsWith(".js"));
for(let file of commands)
{
    const commandName = file.split(".")[0];
    const commandReference = require("./commands/text/"+commandName);
    client.commands.set(commandName, commandReference);
}

// Gets the slash commands collection to do a handler...
client.slashCommands = new Discord.Collection();
const slashCommands = fs.readdirSync("./commands/slash/").filter(file => file.endsWith(".js"));
for (const file of slashCommands)
{
    const slashCommandName = file.split(".")[0];
    const slash = require("./commands/slash/"+slashCommandName);
    client.slashCommands.set(slash.name, slash);
}




// Actively listen for messages on the Discord server...
client.on("messageCreate", message =>
{
    // If the message is from a bot...
    if (message.author.bot)
    {
        // Checks if in the rank channel notifications someone gets a new achievement...
        // It is because the MEE6 bot update the levels and notifies on this channel...
        if (message.channel.id === variables.ranksChannelID)
        {
            // If is there a mentionated user
            if (message.mentions.members.size)
            {
                checkAchievements.run(client, message,
                message.mentions.members.first().user.id,
                message.mentions.members.first().user.id,
                false);
            }
        }
        return;
    }
    
    // If the message is not a command...
    var messageContent = message.content.toLowerCase();
    if (!messageContent.startsWith(prefix + " ") &&
    messageContent !== "<@"+variables.botID+">" &&
    messageContent !== "<@&"+variables.botRoleID+">")
    {
        countMessage.run(message);
        return;
    }

    // Only if the message call a command, it searchs the command...
    if (messageContent.startsWith(prefix + " ") || messageContent === "<@"+variables.botID+">" || messageContent === "<@&"+variables.botRoleID+">")
    {
        // Gets the command info to execute functions...
        const args = messageContent.slice(prefix.length + 1).split(/ +/);
        var cmd = args.shift().toLowerCase();

        // For the command "comandos" or "ayuda" or "help" or "commands"...
        if(cmd === "comandos" || cmd === "ayuda" || cmd === "commands" || cmd === "comands" || cmd === "help" ||
        cmd === "<@"+variables.botID+">" || messageContent === "<@"+variables.botID+">"
        || cmd === "<@&"+variables.botRoleID+">" || messageContent === "<@&"+variables.botRoleID+">")
            cmd = "commands";

        // For the command "perfil" or "profile" or "stats" or "yo"...
        else if(cmd === "perfil" || cmd === "profile" || cmd === "stats" || cmd === "yo")
            cmd = "profile";

        // For the command "logros" or "achievements"...
        else if(cmd === "logros" || cmd === "achievements" || cmd === "trofeos")
            cmd = "achievements";

        // For the command "medallas" or "insignias" or "roles" or "badges"...
        else if(cmd === "medallas" || cmd === "insignias" || cmd === "roles" || cmd === "badges")
            cmd = "badges";

        // For the command "top" or "ranking"...
        else if(cmd === "top" || cmd === "ranking")
            cmd = "top";

        // For the command "rank" or "nivel" or "level" or "rango"...
        else if(cmd === "rank" || cmd === "nivel" || cmd === "level" || cmd === "rango")
            cmd = "rank";
        
        // For the command "calendario" or "calendar"...
        else if(cmd === "calendario" || cmd === "calendar")
            cmd = "calendar";

        // For the command "admin"...
        else if(cmd === "admin")
            cmd = "admin";

        // For the command "eventos" or "events" or "semana" or "week"...
        else if(cmd === "eventos" || cmd === "events" || cmd === "semana" || cmd === "week")
            cmd = "events";

        // Executes the command if it exists...
        const command = client.commands.get(cmd);
        if(command) command.run(client, message, args);

        // Count the message...
        countMessage.run(message);
        countCommand.run(message);
    }
});




client.on("interactionCreate", (interaction) =>
{
    // If it is not a command...
    if (!interaction.isCommand()) return;

    // If it not exist slash command...
    const slashCommands = client.slashCommands.get(interaction.commandName);
    if (!slashCommands) return;

    // If the member has no permission to do the slash command...
    if (!interaction.member.roles.cache.some(roles => roles.id === variables.botAdminRoleID))
        return interaction.reply({ content: "Tú no tienes permiso para usar este comando :shushing_face:", ephemeral: true});
    
    // Try to execute the command...
    try
    {
        slashCommands.run(client, interaction);
    }
    catch(error)
    {
        console.log(error);
    }
});




// Actively listen when a member joins...
client.on("guildMemberAdd", member =>
{
    // Saves the new member on the database...
    newMember.run(member.user.id);
});




// Login to Discord with his client's token...
client.login(TOKEN);