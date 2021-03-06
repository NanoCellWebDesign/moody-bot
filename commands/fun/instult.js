const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");

module.exports = {
    name: "insult",
    aliases: ["i",],
    category: "fun",
    description: "Insults a member",
    usage: "< mention >",
    run: async (client, message, args) => {
        const roleColor = "#0facf3";

        if (message.deletable) message.delete()
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);

        if (args.length < 1)
            return message.reply('Requires a name!').then(m => m.delete(5000)
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!rMember)
            return message.reply("Couldnt find that person").then(m => m.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));

        console.log(rMember);

        request({
            url: `https://insult.mattbas.org/api/insult.txt?who=`,
            json: true
        }, (err, response, body) => {
            console.log(response.statusCode.toString());
            if (response.statusCode.toString() !== '200') {
                return message.reply('Not Found!').then(m => m.delete()
                    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                    .catch(console.error));
            }

                console.log(`${ rMember } ${ body }`);

            const embed = new MessageEmbed()
                .setColor(roleColor)
                .setDescription(`${rMember} ${body}`)

            message.channel.send(embed);
        });

    }
}