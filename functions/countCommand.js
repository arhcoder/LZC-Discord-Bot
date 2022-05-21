const fetch = require("node-fetch");

module.exports.run = async (message) =>
{
    await fetch("http://localhost:3000/command/"+message.author.id);
};