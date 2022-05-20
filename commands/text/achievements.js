const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { pagination } = require("reconlx");
const constants = require("../../config/constants");

module.exports.run = async (client, message, args) =>
{
    // Takes the mentioned users to get the args, or the first arg...
    var member = message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

    // If it doesn't has arguments, it takes the author as the argument...
    if (args.length == 0) member = message.guild.members.cache.get(message.author.id);

    // If the argument was correct...
    try
    {
        // Checks if the mentioned user is a bot...
        if (member.user.bot) return message.reply("Los bots no juegan! :eyes:");

        // Use the arguments for the request...
        const memberID = member.user.id;

        const response = await fetch("http://localhost:3000/achievements/" + memberID);
        var memberAchievements = await response.json();
        memberAchievements = memberAchievements[0].achievements;
        // console.log(memberAchievements);

        // Gets the achievements info...
        const newResponse = await fetch("http://localhost:3000/achievements");
        const achievementsList = await newResponse.json();
        // console.log(achievementsList);

        // Fills a json with the data of embeds...
        var achievements = [];

        // It read the list of achievements...
        for (achievement of achievementsList)
        {
            // Checks if the member has the achievement...
            if (memberAchievements.includes(achievement.id))
            {
                // Build the embed field with the won achievement data...
                var achievementField =
                {
                    name: "**:gem: " + achievement.name+"**",
                    value: constants.separator+"  *"+achievement.description+" •*\n\u200B"
                };
            }
            else
            {
                // Build the embed field with the non-won achievement data...
                var achievementField =
                {
                    name: "**"+constants.lock+"**\u200B",
                    value: constants.separator+"  *"+achievement.description+" •*\n\u200B"
                };
            }
            achievements.push(achievementField);
        }
        // console.log(achievements);


        // Builds the Embeds...
        const embed01 = new MessageEmbed()
        .setTitle("**Logros de " +member.user.username+"**")
        .setDescription("En eventos...\n\u200B")
        .setColor(constants.lzcolor)
        .addFields(
            {name: achievements[0].name, value: achievements[0].value, inline: false},
            {name: achievements[1].name, value: achievements[1].value, inline: false},
            {name: achievements[2].name, value: achievements[2].value, inline: false},
            {name: achievements[3].name, value: achievements[3].value, inline: false},
            {name: achievements[4].name, value: achievements[4].value, inline: false},
            {name: achievements[5].name, value: achievements[5].value, inline: false}
        )
        // .setFooter({text: "Página 1 de 4"});*/
        
        const embed02 = new MessageEmbed()
        .setTitle("**Logros de " +member.user.username+"**")
        .setDescription("En niveles...\n\u200B")
        .setColor(constants.lzcolor)
        .addFields(
            {name: achievements[6].name, value: achievements[6].value, inline: false},
            {name: achievements[7].name, value: achievements[7].value, inline: false},
            {name: achievements[8].name, value: achievements[8].value, inline: false},
            {name: achievements[9].name, value: achievements[9].value, inline: false},
            {name: achievements[10].name, value: achievements[10].value, inline: false},
            {name: achievements[11].name, value: achievements[11].value, inline: false}
        )
        // .setFooter({text: "Página 2 de 4"});*/
        
        const embed03 = new MessageEmbed()
        .setTitle("**Logros de " +member.user.username+"**")
        .setDescription("En mensajes...\n\u200B")
        .setColor(constants.lzcolor)
        .addFields(
            {name: achievements[12].name, value: achievements[12].value, inline: false},
            {name: achievements[13].name, value: achievements[13].value, inline: false},
            {name: achievements[14].name, value: achievements[14].value, inline: false},
            {name: achievements[15].name, value: achievements[15].value, inline: false},
            {name: achievements[16].name, value: achievements[16].value, inline: false},
            {name: achievements[17].name, value: achievements[17].value, inline: false},
            // {name: achievements[18].name, value: achievements[18].value, inline: false},
            // {name: achievements[19].name, value: achievements[19].value, inline: false}
        )
        // .setFooter({text: "Página 3 de 4"});*/
        
        const embed04 = new MessageEmbed()
        .setTitle("**Logros de " +member.user.username+"**")
        .setDescription("En V.S...\n\u200B")
        .setColor(constants.lzcolor)
        .addFields(
            {name: achievements[20].name, value: achievements[20].value, inline: false},
            {name: achievements[21].name, value: achievements[21].value, inline: false},
            {name: achievements[22].name, value: achievements[22].value, inline: false},
            {name: achievements[23].name, value: achievements[23].value, inline: false},
            {name: achievements[24].name, value: achievements[24].value, inline: false},
            {name: achievements[25].name, value: achievements[25].value, inline: false}
        )
        // .setFooter({text: "Página 4 de 4"});*/

        // Do the pagination with the embeds...
        try
        {
            var embeds = [embed01, embed02, embed03, embed04];
            pagination(
            {
                embeds: embeds,
                message: message,
                fastSkip: false,
                time: 44000
            });
        }
        catch(error)
        {
            console.log(error);
        }
    }
    catch
    {
        message.reply("Escribe un usuario válido :slight_smile:");
    }
};