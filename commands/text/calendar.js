const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const constants = require("../../config/constants");

module.exports.run = (client, message, arg) =>
{
    var calendar;
    // Gets the image url...
    try
    {
        calendar = db.get("calendar.url");
    }
    catch
    {
        return message.reply("Error al intentar conseguir el calendario, prueba de nuevo :pensive:");
    }

    // If it do not gets an image...
    if (calendar === null || calendar === undefined)
        return message.reply("De momento no hay ningún calendario, prueba más tarde :pensive:");
    else
    {
        // Send the calendar image in an embed...
        const calendarEmbed = new MessageEmbed()
        .setTitle("**Calendario de la semana**")
        .setColor(constants.lzcolor)
        .setImage(calendar)
        // .addFields()
        .setTimestamp(new Date())
        .setFooter({iconURL: client.user.displayAvatarURL(), text: "LZC Discord Bot"});
        message.channel.send({embeds: [calendarEmbed]});
    }
};