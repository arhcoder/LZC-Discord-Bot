const Discord = require("discord.js");
const fetch = require("node-fetch");
const newAchievement = require("../../functions/newAchievement");

module.exports =
{
    name: "vsparticipantes",
    description: "👊 Registra a los participantes de un troneo V.S...",
    options:
    [
        {
            name: "primero",
            description: "Primer miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: true
        },
        {
            name: "segundo",
            description: "Segundo miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        },
        {
            name: "tercero",
            description: "Tercer miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        },
        {
            name: "cuarto",
            description: "Cuarto miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        },
        {
            name: "quinto",
            description: "Quinto miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        },
        {
            name: "sexto",
            description: "Sexto miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        },
        {
            name: "séptimo",
            description: "Séptimo miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        },
        {
            name: "octavo",
            description: "Octavo miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        },
        {
            name: "noveno",
            description: "Noveno miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        },
        {
            name: "décimo",
            description: "Décimo miembro participante...",
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
            required: false
        }
    ],
    run: async (client, interaction) =>
    {
        try
        {
            // Gets the options data...
            var options = [];
            var members = [];
            var participants = "";
            options.push(interaction.options.get("primero"));
            options.push(interaction.options.get("segundo"));
            options.push(interaction.options.get("tercero"));
            options.push(interaction.options.get("cuarto"));
            options.push(interaction.options.get("quinto"));
            options.push(interaction.options.get("sexto"));
            options.push(interaction.options.get("séptimo"));
            options.push(interaction.options.get("octavo"));
            options.push(interaction.options.get("noveno"));
            options.push(interaction.options.get("décimo"));

            // Separated the options...
            for (var option of options)
                if (option) members.push(option.user.id);
            
            // Do for each member on the options...
            for (var member in members)
            {
                // Increments the stat in the database...
                await fetch("http://localhost:3000/increment/vsparticipations/"+members[member]);

                // Checks if the member has not the achievement, getting first the achievements...
                const Aresponse = await fetch("http://localhost:3000/achievements/"+members[member]);
                var memberAchievements = await Aresponse.json();
                memberAchievements = memberAchievements[0].achievements;

                // When a user participates in an event, it wins the achievement A04...
                if (!memberAchievements.includes("A04"))
                    await newAchievement.run(client, members[member], "A04");

                // Gives the achievement...
                if (!memberAchievements.includes("D01"))
                    await newAchievement.run(client, members[member], "D01");

                // Counts if it has more than five V.S participations...
                const Bresponse = await fetch("http://localhost:3000/stat/vsparticipations/"+members[member]);
                const vsparticipations = await Bresponse.json();
                
                // If it is more than five, it gives a new achievement...
                if (vsparticipations[0].vsparticipations >= 5 && !memberAchievements.includes("D04"))
                    await newAchievement.run(client, members[member], "D04");
                
                // Build the participators message...
                participants += "<@"+members[member]+">\n";
            }
            
            // Send the interaction success message...
            interaction.reply({content: "Comando exitoso :wink:", ephemeral: true});
            interaction.channel.send(":punch: ¡Que gane el mejor!\n"+participants);
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