const Mee6LevelsApi = require("mee6-levels-api");
const fetch = require("node-fetch");
const constants = require("../config/constants");
const newAchievement = require("../functions/newAchievement");
const showAchievements = require("../functions/showAchievements");

module.exports.run = async (client, message, userID, args, shows = true) =>
{
    // Gets the MEE6 level of the user...
    Mee6LevelsApi.getUserXp(constants.lzcGuildID, userID).then(async user =>
    {
        // Gets the achievements of the user...
        const Aresponse = await fetch("http://localhost:3000/achievements/" + userID);
        var memberAchievements = await Aresponse.json();
        memberAchievements = memberAchievements[0].achievements;

        // Gets the messages stats of the user...
        const Bresponse = await fetch("http://localhost:3000/messages/" + userID);
        var memberMessages = await Bresponse.json();
        memberMessages = memberMessages[0];


        // Do the comparation of each necessary achievement...
        
        // "B01": Level 10 or higher...
        if (user.level >= 10 && !memberAchievements.includes("B01"))
            await newAchievement.run(client, userID, "B01");
        
        // "B02": Level 20 or higher...
        if (user.level >= 20 && !memberAchievements.includes("B02"))
            await newAchievement.run(client, userID, "B02");
        
        // "B03": Level 30 or higher...
        if (user.level >= 30 && !memberAchievements.includes("B03"))
            await newAchievement.run(client, userID, "B03");
        
        // "B04": Level 60 or higher...
        if (user.level >= 60 && !memberAchievements.includes("B04"))
            await newAchievement.run(client, userID, "B04");
        
        // "B05": Level 80 or higher...
        if (user.level >= 80 && !memberAchievements.includes("B05"))
            await newAchievement.run(client, userID, "B05");
        
        // "B06": Level 100 or higher...
        if (user.level >= 100 && !memberAchievements.includes("B06"))
            await newAchievement.run(client, userID, "B06");
        
        
        // "C01": Cartoon messages >= 50...
        if (memberMessages.cartoon >= 50 && !memberAchievements.includes("C01"))
            await newAchievement.run(client, userID, "C01");

        // "C02": Memes messages >= 100...
        if (memberMessages.memes >= 100 && !memberAchievements.includes("C02"))
            await newAchievement.run(client, userID, "C02");
        
        // "C03": Anime messages >= 200...
        if (memberMessages.anime >= 200 && !memberAchievements.includes("C03"))
            await newAchievement.run(client, userID, "C03");
        
        // "C04": Emojis messages >= 500...
        if (memberMessages.emojis >= 500 && !memberAchievements.includes("C04"))
            await newAchievement.run(client, userID, "C04");
        
        // "C05": Pop messages >= 1000...
        if (memberMessages.pop >= 1000 && !memberAchievements.includes("C05"))
            await newAchievement.run(client, userID, "C05");
        
        // "C06": Antivoz messages >= 2000...
        if (memberMessages.antivoz >= 2000 && !memberAchievements.includes("C06"))
            await newAchievement.run(client, userID, "C06");
        
        // If it has to show the achievement...
        if (shows)
        {
            await showAchievements.run(message, userID, args);
        }
    });
};