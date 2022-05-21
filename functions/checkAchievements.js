const newAchievement = require("../functions/newAchievement");

module.exports.run = async (client, userID) =>
{
    newAchievement.run(client, userID, "A02");
};