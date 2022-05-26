const Discord = require("discord.js");
const fetch = require("node-fetch");
const newAchievement = require("../../functions/newAchievement");

module.exports =
{
    name: "request",
    description: "🛐 Añade un miembro al que se le haya aceptado un request...",
    options:
    [
        {
            name: "miembro",
            description: "Miembro al que se le aceptó el request...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: true
        }
    ],
    run: async (client, interaction) =>
    {
        try
        {
            // Gets the member data...
            var memberID = interaction.options.get("miembro");
            memberID = memberID.user.id;

            // Increments the stat in the database...
            await fetch("http://localhost:3000/increment/requests/"+memberID);

            // Checks if the member has not the achievement, getting first the achievements...
            const Aresponse = await fetch("http://localhost:3000/achievements/"+memberID);
            var memberAchievements = await Aresponse.json();
            memberAchievements = memberAchievements[0].achievements;

            // When a user participates in an event, it wins the achievement A04...
            if (!memberAchievements.includes("A04"))
                await newAchievement.run(client, memberID, "A04");

            // Gives the achievement...
            if (!memberAchievements.includes("A01"))
                await newAchievement.run(client, memberID, "A01");
            
            // Send the interaction success message...
            interaction.reply({content: "Comando exitoso :wink:", ephemeral: true});
            interaction.channel.send("Hey, <@"+memberID+">, te aceptaron el request 🛐");
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