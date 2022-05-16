const fetch = require("node-fetch");

module.exports.run = async (client, message, args) =>
{
    var memberID;
    // If the command has arguments...
    // It takes the first argument...
    if (args.length > 0) memberID = args[0];

    // If the command has not arguments...
    else memberID = message.author.id;

    const response = await fetch("http://localhost:3000/achievements/" + memberID);
    const json = await response.json();

    console.log(json);
    message.channel.send("Logros...");
};