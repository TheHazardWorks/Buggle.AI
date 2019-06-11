import config from '../configuration';
let prefix : string = config.PREFIX;

export = {
    command: function() { return `emoji` },

    description: function() { return `Show a larger version of a custom emoji!` },

    usage: function() { return `${prefix}emoji <EMOJI>` },

    demo: function() { return `${prefix}emoji :owo:` },

    category: function() { return `random` },

    operation: function(buggle: any, message: any, options: any, commands: any) {
        if(options[1].startsWith('<')) {
            let emoji = options[1].split(':')[2].replace('>','');
            let emojiLink = `https://cdn.discordapp.com/emojis/${emoji}.png`;
            buggle.createMessage(message.channel.id, {
                embed: {
                    title: options[1].split(':')[1],
                    image: { url: emojiLink }
                }
            })
        } else {
            buggle.createMessage(message.channel.id, `This only works with Custom Emoji!`)
        }
    }
}
