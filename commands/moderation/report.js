const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention | id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete()
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!rMember)
            return message.reply("Couldnt find that person").then(m => m.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));

        if(rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.reply("Can't report that member").then(m => m.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));

        if(!args[1])
            return message.channel.send("Please provide a reason for the report!").then(m => m.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));
        
        const channel = message.guild.channels.cache.find(c => c.name === "reports");

        if(!channel)
            return message.channel.send("I cound not find a `#reports` channel").then(m => m.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error));

        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setThumbnail(rMember.user.displayAvatarURL())
            .setAuthor("Reported member", rMember.user.displayAvatarURL())
            .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.id})
            **> Reported by:** ${message.member} (${message.member.id})
            **> Reported In:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`)
            .setTimestamp();

        return channel.send(embed);
    }
}