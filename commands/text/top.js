const Mee6LevelsApi = require("mee6-levels-api");
const { MessageEmbed } = require("discord.js");
const { pagination } = require("reconlx");
const fetch = require("node-fetch");
const constants = require("../../config/constants");

module.exports.run = (client, message, args) =>
{
    // Set of member stats fields for the embed...
    var board = [];
    try
    {
        // Access to the MEE6 Levels API and extracts the data...
        Mee6LevelsApi.getLeaderboardPage(constants.lzcGuildID).then(async leaderboard =>
        {
            for (var i = 0; i < 50; i++)
            {
                // Gets MEE6 specific data...
                let firstEmoji = "";
                let secondEmoji = "";
                let member = leaderboard[i]["tag"];
                let level = leaderboard[i]["level"];
                let xp = leaderboard[i]["xp"]["totalXp"];

                // Gets a user lzc points data from the database...
                var lzc = 0;
                try
                {
                    const response = await fetch("http://localhost:3000/points/"+leaderboard[i]["id"]);
                    lzc = await response.json()[0].lzcpoints;
                }
                catch
                {
                    lzc = "?";
                }

                // Give format to the numbers...
                if (parseInt(xp) >= 1000000) xp = "" + (parseInt(xp) / 1000000).toFixed(2) + "M";
                else if (parseInt(xp) >= 1000) xp = "" + parseInt(parseInt(xp) / 1000) + "k";
    
                // Sets the emojis of the embed field title...
                if (i+1 === 1)
                {
                    firstEmoji = ":first_place:";
                    secondEmoji = ":small_orange_diamond:";
                }
                else if (i+1 === 2)
                {
                    firstEmoji = ":second_place:";
                    secondEmoji = ":small_orange_diamond:";
                }
                else if (i+1 === 3)
                {
                    firstEmoji = ":third_place:";
                    secondEmoji = ":small_orange_diamond:";
                }
                else if (i+1 === 4 || i+1 === 5)
                {
                    firstEmoji = ":small_orange_diamond:";
                    secondEmoji = ":small_orange_diamond:";
                }
                else
                {
                    firstEmoji = ":small_blue_diamond:";
                    secondEmoji = ":small_blue_diamond:";
                }
    
                // Build the embed field with the data...
                var memberStatsField =
                {
                    name: firstEmoji+" **\`#"+(i+1)+"\`**  "+member+" "+secondEmoji,
                    value: constants.separator+"  *Nivel:* \`"+level+"\`  *XP:* \`"+xp+"\`  *LZC:* \`"+lzc+"\`\n\u200B"
                };
                board.push(memberStatsField);
            }
    
            // Create the embeds based on the board...
            const topEmbed01 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[0].name, value: board[0].value, inline: false},
                {name: board[1].name, value: board[1].value, inline: false},
                {name: board[2].name, value: board[2].value, inline: false},
                {name: board[3].name, value: board[3].value, inline: false},
                {name: board[4].name, value: board[4].value, inline: false},
            )
            // .setFooter({text: "Página 1 de 10"});
    
            const topEmbed02 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[5].name, value: board[5].value, inline: false},
                {name: board[6].name, value: board[6].value, inline: false},
                {name: board[7].name, value: board[7].value, inline: false},
                {name: board[8].name, value: board[8].value, inline: false},
                {name: board[9].name, value: board[9].value, inline: false},
            )
            // .setFooter({text: "Página 2 de 10"});
    
            const topEmbed03 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[10].name, value: board[10].value, inline: false},
                {name: board[11].name, value: board[11].value, inline: false},
                {name: board[12].name, value: board[12].value, inline: false},
                {name: board[13].name, value: board[13].value, inline: false},
                {name: board[14].name, value: board[14].value, inline: false},
            )
            // .setFooter({text: "Página 3 de 10"});
    
            const topEmbed04 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[15].name, value: board[15].value, inline: false},
                {name: board[16].name, value: board[16].value, inline: false},
                {name: board[17].name, value: board[17].value, inline: false},
                {name: board[18].name, value: board[18].value, inline: false},
                {name: board[19].name, value: board[19].value, inline: false},
            )
            // .setFooter({text: "Página 4 de 10"});
    
            const topEmbed05 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[20].name, value: board[20].value, inline: false},
                {name: board[21].name, value: board[21].value, inline: false},
                {name: board[22].name, value: board[22].value, inline: false},
                {name: board[23].name, value: board[23].value, inline: false},
                {name: board[24].name, value: board[24].value, inline: false},
            )
            // .setFooter({text: "Página 5 de 10"});
    
            const topEmbed06 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[25].name, value: board[25].value, inline: false},
                {name: board[26].name, value: board[26].value, inline: false},
                {name: board[27].name, value: board[27].value, inline: false},
                {name: board[28].name, value: board[28].value, inline: false},
                {name: board[29].name, value: board[29].value, inline: false},
            )
            // .setFooter({text: "Página 6 de 10"});
    
            const topEmbed07 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[30].name, value: board[30].value, inline: false},
                {name: board[31].name, value: board[31].value, inline: false},
                {name: board[32].name, value: board[32].value, inline: false},
                {name: board[33].name, value: board[33].value, inline: false},
                {name: board[34].name, value: board[34].value, inline: false},
            )
            // .setFooter({text: "Página 7 de 10"});
    
            const topEmbed08 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[35].name, value: board[35].value, inline: false},
                {name: board[36].name, value: board[36].value, inline: false},
                {name: board[37].name, value: board[37].value, inline: false},
                {name: board[38].name, value: board[38].value, inline: false},
                {name: board[39].name, value: board[39].value, inline: false},
            )
            // .setFooter({text: "Página 8 de 10"});
    
            const topEmbed09 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[40].name, value: board[40].value, inline: false},
                {name: board[41].name, value: board[41].value, inline: false},
                {name: board[42].name, value: board[42].value, inline: false},
                {name: board[43].name, value: board[43].value, inline: false},
                {name: board[44].name, value: board[44].value, inline: false},
            )
            // .setFooter({text: "Página 9 de 10"});
    
            const topEmbed10 = new MessageEmbed()
            .setTitle("**TOP MIEMBROS LZC**")
            .setDescription("\n\u200B")
            .setColor(constants.lzcolor)
            .addFields(
                {name: board[45].name, value: board[45].value, inline: false},
                {name: board[46].name, value: board[46].value, inline: false},
                {name: board[47].name, value: board[47].value, inline: false},
                {name: board[48].name, value: board[48].value, inline: false},
                {name: board[49].name, value: board[49].value, inline: false},
            )
            // .setFooter({text: "Página 10 de 10"});
    
            // Do the pagination with the embeds...
            var embeds = [topEmbed01, topEmbed02, topEmbed03, topEmbed04, topEmbed05,
            topEmbed06, topEmbed07, topEmbed08, topEmbed09, topEmbed10];

            pagination(
            {
                embeds: embeds,
                message: message,
                button:
                [
                    /*{
                        name: "first",
                        emoji: "⬅",
                        style: "PRIMARY"
                    },
                    {
                        name: "second",
                        emoji: ":point_left::skin-tone-1:",
                        style: "PRIMARY"
                    },
                    {
                        name: "third",
                        emoji: ":fleur_de_lis:",
                        style: "PRIMARY"
                    },
                    {
                        name: "fourth",
                        emoji: ":point_left::skin-tone-1:",
                        style: "PRIMARY"
                    }*/
                ],
                fastSkip: true,
                time: 44000
            });
        });
    }
    catch
    {
        message.reply("Ocurrió un error, trata de nuevo más tarde :pensive:");
    }
};