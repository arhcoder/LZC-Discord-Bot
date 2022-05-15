const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const variables = require("../config/variables");
const constants = require("../config/constants");

module.exports.run = async (client, userID, achievementID) =>
{
    try
    {
        // Gets the achievement info...
        const response = await fetch("http://localhost:3000/achievement/" + achievementID);
        var achievement = await response.json();

        // Gets the achievements of the user...
        const anotherResponse = await fetch("http://localhost:3000/achievements/" + userID);
        var memberAchievements = await anotherResponse.json();
        memberAchievements = JSON.parse(memberAchievements[0].achievements);

        // Add the new achievement to the list of member achievemets...
        memberAchievements.push(achievementID);
        memberAchievements = JSON.stringify(memberAchievements);
        memberAchievements.replace("\'", "\"");
        memberAchievements.replace(" ", "");

        // Saves in the database the according data...
        await fetch("http://localhost:3000/achievements/give/"+achievementID+"/"+memberAchievements+"/"+userID);

        // Build the embed and send it into the achievements channel...
        const achievementEmbed = new MessageEmbed()
        .setTitle("**"+achievement[0].name+"**")
        .setDescription("\u200B\n*"+achievement[0].description+"*;\n\u200B")
        .setThumbnail("attachment://"+achievementID+".png")
        .setColor(constants.lzcolor)
        .setTimestamp(new Date())
        .setFooter({text: "🏆"});
        client.channels.cache.get(variables.achievementsChannelID)
        .send(
            {
                content: "¡<@"+userID+"> desbloqueó un nuevo logro!",
                embeds: [achievementEmbed],
                files:
                [{
                    attachment: "./icons/"+achievementID+".png",
                    name: achievementID+".png"
                }]
            }
        );
        
        return;
    }
    catch(error)
    {
        console.log(error);
        return;
    }
};