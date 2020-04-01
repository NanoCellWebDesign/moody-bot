const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");

module.exports = {
    name: "insult",
    aliases: ["i",],
    category: "bbxcentral",
    description: "Returns all users, or one specific users info",
    usage: "< user_name >",
    run: async (client, message, args) => {
        const roleColor = "#0facf3";

        if (message.deletable) message.delete()
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);

        if (args.length < 1)
            return message.reply('Requires a name!').then(m => m.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));

        console.log(`https://insult.mattbas.org/api/insult.txt?who=${args[0]}`);

        request({
            url: `https://insult.mattbas.org/api/insult.txt?who=${args[0]}`,
            json: true
        }, (err, response, body) => {
            console.log(response.statusCode.toString());
            if (response.statusCode.toString() !== '200') {
                return message.reply('Not Found!').then(m => m.delete()
                    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                    .catch(console.error));
            }

            console.log(body);

            const embed = new MessageEmbed()
                .setColor(roleColor)
                .setDescription(body)

            message.channel.send(embed);
        });

    }
}