const { MessageEmbed } = require("discord.js");
const constants = require("../../config/constants");

module.exports.run = async (client, message, args) =>
{
    const commandsEmbed = new MessageEmbed()
    .setTitle("**Comandos LZC**")
    .setColor(constants.lzcolor)
    .setThumbnail(constants.lzclogo)
    .setDescription("Escribe un comando usando el prefijo **lzc**:\n\nCon \`logros\`, \`medallas\`, \`rank\` y \`perfil\` puedes agregar un \`@usuario\` al final;\n\u200B")
    .addFields(
        {
            name: ":trophy:  lzc logros",
            value: constants.separator+"  Muestra tu lista de logros;\n\u200B",
            inline: true
        },
        {
            name: ":medal:  lzc medallas",
            value: constants.separator+"  Muestra tu lista de insignias;\n\u200B",
            inline: true
        },
        {
            name: ":crown:  lzc top",
            value: constants.separator+"  Muestra el top 50 miembros de LZC;\n\u200B",
            inline: true
        },
        {
            name: ":gem:  lzc rank",
            value: constants.separator+"  Muestra tu nivel y experiencia;\n\u200B",
            inline: true
        },
        {
            name: ":fleur_de_lis:  lzc perfil",
            value: constants.separator+"  Muestra todas tus estadísticas;\n\u200B",
            inline: true
        },
        {
            name: ":calendar_spiral:  lzc calendario",
            value: constants.separator+"  Actividades de la semana;\n\u200B",
            inline: true
        },
        {
            name: ":joystick:  lzc comandos",
            value: constants.separator+"  Muestra esta lista de comandos;\n\u200B",
            inline: false
        },
        /*{
            name: ":books:  lzc admin",
            value: constants.separator+"  Muestra la lista de comandos de administrador;\n",
            inline: false
        }*/
    )
    // .setTimestamp(new Date())
    .setFooter({iconURL: client.user.displayAvatarURL(), text: "LZC Discord Bot"});
    message.channel.send({embeds: [commandsEmbed]});
};