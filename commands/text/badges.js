const { MessageEmbed } = require("discord.js");
const constants = require("../../config/constants");

module.exports.run = (client, message, args) =>
{
    // Takes the mentioned users to get the args, or the first arg...
    var member = message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

    // If it doesn't has arguments, it takes the author as the argument...
    if (args.length == 0) member = message.guild.members.cache.get(message.author.id);

    // If the argument was correct...
    try
    {
        // Gets the member badges (roles)...
        const badges = member.roles.cache
        .filter((roles) => roles.id !== message.guild.id)
        .map((role) => role.toString());

        if (badges.length == 0)
            return message.reply("¡No se encontró ninguna insignia! :disappointed_relieved:");

        // Embed message...
        const badgesEmbed = new MessageEmbed()
        // .setTitle("Medallas de "+member.user.username)
        .setDescription("\u200B\n" + badges.join(", ") + "\n\u200B")
        .setAuthor({name: "Medallas de "+member.user.username, iconURL: member.displayAvatarURL()})
        // .setThumbnail(member.displayAvatarURL())
        .setColor(constants.lzcolor)
        .setTimestamp(new Date())
        .setFooter({text: "🏅"});
        message.channel.send({embeds: [badgesEmbed]});
    }
    catch
    {
        message.reply("Escribe un usuario válido...");
    }
};