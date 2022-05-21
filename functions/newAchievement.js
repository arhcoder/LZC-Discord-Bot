const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const variables = require("../config/variables");
const constants = require("../config/constants");

module.exports.run = async (client, userID, achievementID) =>
{
    // Gets the achievement info...
    const response = await fetch("http://localhost:3000/achievement/" + achievementID);
    var achievement = await response.json();

    // Build the embed and send it into the achievements channel...
    const achievementEmbed = new MessageEmbed()
    .setTitle("**"+achievement[0].name+"**")
    .setDescription("\u200B\n*"+achievement[0].description+"*;\n\u200B")
    .setThumbnail(constants.lzclogo)
    .setColor(constants.lzcolor)
    .setTimestamp(new Date())
    .setFooter({text: "🏆"});
    client.channels.cache.get(variables.achievementsChannelID)
    .send({content: "¡<@"+userID+"> desbloqueó un nuevo logro!", embeds: [achievementEmbed]});
};