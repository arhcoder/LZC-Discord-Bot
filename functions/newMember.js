const fetch = require("node-fetch");

module.exports.run = async (memberID) =>
{
    // Do the database command to save a new member...
    try
    {
        await fetch("http://localhost:3000/new/"+memberID);
    }
    catch
    {
        console.log("Member not added...");
    }
};