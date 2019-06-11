import config from '../configuration';
let prefix : string = config.PREFIX;

export = {
    command: function() { return `about` },

    description: function() { return `About Buggle.AI and the Developer!` },

    usage: function() { return `${prefix}about` },

    demo: function() { return `${prefix}about` },

    category: function() { return `util` },

    operation: function(buggle: any, message: any, options: any, commands: any) {
        let dev = message.channel.guild.members.get(config.DEVELOPER);
        buggle.createMessage(message.channel.id, {
            embed: {
                title: `About Me and my Developer!`,
                color: config.COLOR,
                description: `I was created to be a perfect utility for the buggles!`,
                thumbnail: {
                    url: buggle.user.avatarURL
                },
                fields: [
                    {name: `Developer`, value: `<@${dev.id}>`, inline: true},
                    {name: `Artist`, value: `<@232194836625620993>`, inline: true},
                    {name: `Discord API`, value: `Version 7`, inline: true},
                    {name: `Donate`, value: `https://is.gd/DonateBuggleAI`, inline: true}
                ],
                footer: {
                    icon_url: message.channel.guild.iconURL,
                    text: `BuggleAI © The Buggle Species ${new Date().getFullYear()}`
                }
            }
        })
    }
}
