const Discord = require("discord.js");
const fetch = require("node-fetch");
const newAchievement = require("../../functions/newAchievement");

module.exports =
{
    name: "vsfinalistas",
    description: "🥈 Registra a los dos finalistas de un torneo V.S...",
    options:
    [
        {
            name: "primero",
            description: "Primer finalista del V.S...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: true
        },
        {
            name: "segundo",
            description: "Segundo finalista del V.S...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: true
        }
    ],
    run: async (client, interaction) =>
    {
        try
        {
            // Gets the options data...
            var options = [];
            var members = [];
            options.push(interaction.options.get("primero"));
            options.push(interaction.options.get("segundo"));

            // Separated the options...
            for (var option of options)
                if (option) members.push(option.user.id);
            
            // Do for each member on the options...
            for (var member in members)
            {
                // Increments the stat in the database...
                await fetch("http://localhost:3000/increment/vsfinalist/"+members[member]);

                // Checks if the member has not the achievement, getting first the achievements...
                const Aresponse = await fetch("http://localhost:3000/achievements/"+members[member]);
                var memberAchievements = await Aresponse.json();
                memberAchievements = memberAchievements[0].achievements;

                // When a user participates in an event, it wins the achievement A04...
                if (!memberAchievements.includes("A04"))
                    await newAchievement.run(client, members[member], "A04");

                // Gives the achievement...
                if (!memberAchievements.includes("D02"))
                    await newAchievement.run(client, members[member], "D02");

                // Counts if it has more than five V.S finalits...
                const Bresponse = await fetch("http://localhost:3000/stat/vsfinalist/"+members[member]);
                const vsfinalist = await Bresponse.json();
                
                // If it is more than five, it gives a new achievement...
                if (vsfinalist[0].vsfinalist >= 5 && !memberAchievements.includes("D05"))
                    await newAchievement.run(client, members[member], "D05");
            }

            // Build the participators message...
            var participants = ":rosette: <@"+members[0]+"> ***V.S*** <@"+members[1]+"> :rosette:";
            
            // Send the interaction success message...
            interaction.reply({content: "Comando exitoso :wink:", ephemeral: true});
            interaction.channel.send(":second_place: ¡Dos finalistas!, ¿quién ganará?\n"+participants);
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