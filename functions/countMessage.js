const fetch = require("node-fetch");
const variables = require("../config/variables");

module.exports.run = async (message) =>
{
    // Do all the validations to know if it is neccesaty to count the message...
    const messageChannelID = message.channel.id;

    // If it is from "cartoon channel"...
    if (messageChannelID === variables.cartoonChannelID)
        await fetch("http://localhost:3000/count/cartoon/"+message.author.id);
    
    // If it is from "anime channel"...
    else if (messageChannelID === variables.animeChannelID)
        await fetch("http://localhost:3000/count/anime/"+message.author.id);
    
    // If it is from "memes channel"...
    else if (messageChannelID === variables.memesChannelID || messageChannelID === variables.shitpostingChannelID)
        await fetch("http://localhost:3000/count/memes/"+message.author.id);
    
    // If it is from "emojis channel"...
    else if (messageChannelID === variables.emojisChannelID)
        await fetch("http://localhost:3000/count/emojis/"+message.author.id);
    
    // If it is from "pop channel"...
    else if (messageChannelID === variables.popChannelID)
        await fetch("http://localhost:3000/count/pop/"+message.author.id);
    
    // If it is from "lzgeneral channel"...
    // else if (messageChannelID === variables.lzgeneral1ChannelID || messageChannelID === variables.lzgeneral2ChannelID)
    //    await fetch("http://localhost:3000/count/lzgeneral/"+message.author.id);
    
    // If it is from "antivoz channel"...
    else if (messageChannelID === variables.antivozChannelID)
        await fetch("http://localhost:3000/count/antivoz/"+message.author.id);
};