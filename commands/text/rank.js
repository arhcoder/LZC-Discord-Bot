const Discord = require("discord.js");
const Mee6LevelsApi = require("mee6-levels-api");
const canvacord = require("canvacord");
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
        // Checks if the mentioned user is a bot...
        if (member.user.bot) return message.reply("Los bots no juegan! :eyes:");

        // Use the arguments for the request...
        const guildID = constants.lzcGuildID;
        const userID = member.user.id;

        // Gets the MEE6 Api info of the user...
        Mee6LevelsApi.getUserXp(guildID, userID).then(user =>
        {
            // Creates the canvas card of the rank...
            const rank = new canvacord.Rank()

            .setAvatar(user.avatarUrl)
            .setStatus("online", true, 5)
            .setCustomStatusColor("#22C864")
            .setUsername(user.username, "#EEEEEE")
            .setDiscriminator(user.discriminator, "#BBBBBB")
    
            .setRank(user.rank, "TOP #", true)
            .setRankColor(constants.lzcmaincolor)
            
            .setLevel(user.level, "NIVEL # ", true)
            .setLevelColor(constants.lzcmaincolor)
    
            .setBackground("IMAGE", constants.rankCardBackgroundPattern)
            .setOverlay("#0B0B0B", 0.66, true)
    
            .setCurrentXP(user.xp.userXp, "#EEEEEE")
            .setRequiredXP(user.xp.levelXp, "#BBBBBB")
    
            .setProgressBarTrack("#666666")
            .setProgressBar([constants.lzcmaincolor, "#20A808"], "GRADIENT", true);
    
            rank.build()
            .then(data =>
            {
                const attachment = new Discord.MessageAttachment(data, "card.png");
                message.channel.send({files: [attachment]});
            });
        });
    }
    catch
    {
        message.reply("Escribe un usuario válido...");
    }
};