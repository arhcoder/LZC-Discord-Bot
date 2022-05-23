const checkAchievements = require("../../functions/checkAchievements");

module.exports.run = async (client, message, args) =>
{
    // Takes the mentioned users to get the args, or the first arg...
    var member = message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

    // If it doesn't has arguments, it takes the author as the argument...
    if (args.length == 0) member = message.guild.members.cache.get(message.author.id);

    // Checks if the mentioned user is a bot...
    if (member.user.bot) return message.reply("Los bots no juegan! :eyes:");

    // Use the arguments for the request...
    const memberID = member.user.id;

    // Checks if the user deservers achievements...
    await checkAchievements.run(client, message, memberID, args);
};