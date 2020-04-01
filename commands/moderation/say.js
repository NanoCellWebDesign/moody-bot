const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete()
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));

        if (args.length < 1)
            return message.reply('Nothing to say?').then(m => m.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));

        const roleColor = "#0facf3";

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
                .setImage(client.user.displayAvatarURL());

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}