const variables = require("../../config/variables");

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
        return message.reply("Este comando no es para ti :confused:");

    // Else, it continues and obay his author...
    // message.reply("Diga usted, mi amo :pray:");
};