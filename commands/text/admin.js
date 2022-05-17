const { MessageEmbed } = require("discord.js");
const variables = require("../../config/variables");
const constants = require("../../config/constants");

module.exports.run = (client, message, args) =>
{
    // Reads the author roles and decide if it will obey...
    var obedience = false;
    const member = message.guild.members.cache.get(message.author.id);

    const roles = member.roles.cache
    .filter((roles) =>
    {
        if (roles.id === variables.botAdminRoleID)
            obedience = true;
    });

    // If the bot has not obedience to the bot...
    if (!obedience)
        return message.reply("No obedeceré tus órdenes, viejo baboso :robot:");

    // Else, it continues and obay his author...
    // message.reply("Diga usted, mi amo :pray:");

    // Embed message..
    const adminEmbed = new MessageEmbed()
    .setTitle("**Comandos de administrador**")
    .setColor(constants.lzcolor)
    .setDescription("Coloca un \`\/\` para ver los comandos slash de administrador...\n\u200B")
    .addFields(
        {
            name: ":clipboard:  lzc eventos",
            value: constants.separator+"  Escribe este comando e inserta una imagen con el calendario de eventos de la semana, para actualizarlo. "+
            "Colocar la imagen y el comando en el mismo mensaje;\n\u200B",
            inline: false
        },
    )
    // .setTimestamp(new Date())
    .setFooter({iconURL: client.user.displayAvatarURL(), text: "LZC Discord Bot"});
    message.channel.send({embeds: [adminEmbed]});
};