const Discord = require("discord.js");
const Mee6LevelsApi = require("mee6-levels-api");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const constants = require("../../config/constants");
const pagination = require("../../functions/pagination");

module.exports.run = (client, message, args) =>
{
    // Takes the mentioned users to get the args, or the first arg...
    var member = message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

    // If it doesn"t has arguments, it takes the author as the argument...
    if (args.length == 0) member = message.guild.members.cache.get(message.author.id);

    // If the argument was correct...
    try
    {
        // Checks if the mentioned user is a bot...
        if (member.user.bot) return message.reply("Los bots no juegan! :eyes:");

        // Use the arguments for the request...
        const guildID = constants.lzcGuildID;
        const userID = member.user.id;

        // Gets the MEE6 Api info of the user...
        Mee6LevelsApi.getUserXp(guildID, userID).then(async user =>
        {
            // Gets all the member"s server stats...
            const response = await fetch("http://localhost:3000/stats/"+user.id);
            var stats = await response.json();
            // console.log(stats);

            // Achievements...
            const achievements = await JSON.parse(stats[1][0].achievements).length;
            // console.log(achievements);

            // Badges...
            const badges = member.roles.cache
            .filter((roles) => roles.id !== message.guild.id)
            .map((role) => role.toString());
            // console.log(badges.length);

            // Build and send the embeds...
            const mee6StatsEmbed = new MessageEmbed()
            .setAuthor({name: "Estadísticas de " +user.username, iconURL: member.displayAvatarURL()})
            .setThumbnail(constants.lzclogo)
            .setDescription(":one:  Desde el inicio del servidor...\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {
                    name: ":fleur_de_lis:  Nivel:",
                    value: constants.separator+"  #\`"+user.level+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":crown:  Top:",
                    value: constants.separator+"  #\`"+user.rank+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":thermometer:  Experiencia:",
                    value: constants.separator+"  \`"+user.xp.totalXp+"\` xp;\n\u200B",
                    inline: false
                },
                {
                    name: ":envelope:  Mensajes enviados:",
                    value: constants.separator+"  #\`"+user.messageCount+"\`;\n\u200B",
                    inline: false
                }
            );

            const serverStatsEmbed = new MessageEmbed()
            .setAuthor({name: "Estadísticas de " +user.username, iconURL: member.displayAvatarURL()})
            .setThumbnail(constants.lzclogo)
            .setDescription(":two:  Especiales del servidor...\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {
                    name: ":green_heart:  Puntos LZC:",
                    value: constants.separator+"  #\`"+stats[1][0].lzcpoints+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":trophy:  Logros:",
                    value: constants.separator+"  #\`"+achievements+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":military_medal:  Medallas:",
                    value: constants.separator+"  #\`"+badges.length+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":robot:  Comandos:",
                    value: constants.separator+"  #\`"+stats[0][0].commands+"\`;\n\u200B",
                    inline: false
                }
            );

            const eventsStatsEmbed = new MessageEmbed()
            .setAuthor({name: "Estadísticas de " +user.username, iconURL: member.displayAvatarURL()})
            .setThumbnail(constants.lzclogo)
            .setDescription(":three:  Eventos del servidor...\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {
                    name: ":movie_camera:  Películas vistas:",
                    value: constants.separator+"  #\`"+stats[0][0].movies+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":first_quarter_moon_with_face:  Pijamadas:",
                    value: constants.separator+"  #\`"+stats[0][0].sleepovers+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":place_of_worship:  Requests aceptados:",
                    value: constants.separator+"  #\`"+stats[0][0].requests+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":art:  Dibujos LZColors:",
                    value: constants.separator+"  #\`"+stats[0][0].colors+"\`;\n\u200B",
                    inline: false
                }
            );

            const VSStatsEmbed = new MessageEmbed()
            .setAuthor({name: "Estadísticas de " +user.username, iconURL: member.displayAvatarURL()})
            .setThumbnail(constants.lzclogo)
            .setDescription(":four:  Torneos V.S...\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {
                    name: ":punch::skin-tone-1:  V.S participados",
                    value: constants.separator+"  #\`"+stats[0][0].vsparticipations+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":second_place:  V.S finalista",
                    value: constants.separator+"  #\`"+stats[0][0].vsfinalist+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":star2:  V.S All-Stars",
                    value: constants.separator+"  #\`"+stats[0][0].vsallstars+"\`;\n\u200B",
                    inline: false
                },
                {
                    name: ":rosette:  V.S Ganados",
                    value: constants.separator+"  #\`"+stats[0][0].vswins+"\`;\n\u200B",
                    inline: false
                }
            );

            // Do the pagination with the embeds...
            var embeds = [mee6StatsEmbed, serverStatsEmbed, eventsStatsEmbed, VSStatsEmbed];
            const options =
            [{
                label: "En el servidor...",
                emoji: "1️⃣"
            },
            {
                label: "En la comunidad...",
                emoji: "2️⃣"
            },
            {
                label: "En eventos...",
                emoji: "3️⃣"
            },
            {
                label: "En torneos V.S...",
                emoji: "4️⃣"
            }];

            try
            {
                pagination(message, embeds, options);
            }
            catch(error)
            {
                console.log(error);
            }
        });
    }
    catch
    {
        message.reply("Escribe un usuario válido...");
    }
};