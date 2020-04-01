const { getMember, formatDate} = require("../../functions.js")
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    description: "Returns latency and API ping",
    usage: "[username | id | mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        //Member Variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .cache.filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        //User Variables
        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor("#0facf3")

            .addField('Member Information', stripIndents`**> Display Name:** ${member.displayName}
            **> Joined At:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField('User Information', stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Created At:** ${created}`, true)

            .setTimestamp();

        if (member.user.presence.activities)
            embed.addField('Status', `**> Activity:** ${member.user.presence.activities}`);

        message.channel.send(embed);
    }
}