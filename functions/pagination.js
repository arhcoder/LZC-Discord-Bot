/// PAGINATION CODE CREDITS TO Krazy Developer ///

const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = async (message, pages, options, time = 40000, placeholder = "Elige una categoría") =>
{
    if (!message || !Array.isArray(pages) || !Array.isArray(options) || pages.length < 1 || pages.length !== options.length, typeof (time) !== "number" || typeof (placeholder) !== "string") throw Error("Error! Parámetros inválidos...");

    const menu = new MessageSelectMenu(
    {
        customId: "menu_1",
        placeholder,
        options: options.map((v, i) =>
        {
            v.value = i.toString();
            v.default = i === 0;

            return v;
        })
    });

    let index = 0;

    const data =
    {
        fetchReply: true,
        components: [new MessageActionRow().addComponents(menu)],
        embeds: [pages[index]]
    },

    msg = message.replied ? await message.followUp(data) : await message.channel.send(data);

    const col = msg.createMessageComponentCollector(
    {
        filter: i => i.user.id === message.author.id,
        time
    });

    col.on("collect", async (i) =>
    {
        index = parseInt(i.values[0]);

        menu.options = menu.options.map(v =>
        {
            v.default = v.value === index.toString();
            return v;
        });

        i.update(
        {
            embeds: [pages[index]],
            components: [new MessageActionRow().addComponents(menu)]
        });
    });

    col.on("end", () =>
    {
        msg.edit(
        {
            components:
            []
        })
    })
}