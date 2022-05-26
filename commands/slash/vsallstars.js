const Discord = require("discord.js");
const fetch = require("node-fetch");
const newAchievement = require("../../functions/newAchievement");

module.exports =
{
    name: "vsallstars",
    description: "🌟 Corona ganador al mejor artista de una edición de V.S All-Stars...",
    options:
    [
        {
            name: "artista",
            description: "Artista ganador del V.S All-Stars...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: true
        }
    ],
    run: async (client, interaction) =>
    {
        try
        {
            // Gets the member data...
            var memberID = interaction.options.get("artista");
            memberID = memberID.user.id;

            // Increments the stat in the database...
            await fetch("http://localhost:3000/increment/vsallstars/"+memberID);

            // Checks if the member has not the achievement, getting first the achievements...
            const Aresponse = await fetch("http://localhost:3000/achievements/"+memberID);
            var memberAchievements = await Aresponse.json();
            memberAchievements = memberAchievements[0].achievements;

            // When a user participates in an event, it wins the achievement A04...
            if (!memberAchievements.includes("A04"))
                await newAchievement.run(client, memberID, "A04");

            // Gives the achievement...
            if (!memberAchievements.includes("D06"))
                await newAchievement.run(client, memberID, "D06");
            
            // Send the interaction success message...
            interaction.reply({content: "Comando exitoso :wink:", ephemeral: true});
            interaction.channel.send(":star2: <@"+memberID+"> :star2:\n¡Es el ganador del torneo V.S All-Stars!\n***¡Felicidades, artista!***");
        }
        catch(error)
        {
            // Send the interaction fail message...
            // It also send a magic notification message to the implicated members...
            interaction.reply({ content: "No se pudieron guardar los cambios...\nPrueba de nuevo :confounded:", ephemeral: true});
            console.log(error);
        }
    }
}