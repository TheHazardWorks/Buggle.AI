import config from '../configuration';
let prefix : string = config.client.prefix;

export = {
    command: function() { return `quote` },

    description: function() { return `Quote that message for all eternity!` },

    usage: function() { return `${prefix}quote <ID>` },

    demo: function() { return `${prefix}quote 572175379045810216` },

    category: function() { return `random` },

    operation: function(buggle: any, message: any, options: any, commands: any) {
        buggle.getMessage(message.channel.id, options[1]).then((quote: any) => {
            buggle.createMessage(config.channels.QUOTES, {
                embed: {
                    description: `*${quote.content}*`,
                    color: 0x0AD690,
                    timestamp: new Date(quote.timestamp),
                    footer: {
                        icon_url: quote.author.avatarURL,
                        text: `${quote.author.username}#${quote.author.discriminator}`
                    }
                }
            })
            buggle.createMessage(message.channel.id, `Added that to <#547445778331729931>!`)
        })
    }
}
