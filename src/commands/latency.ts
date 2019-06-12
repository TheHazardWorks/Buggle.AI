import config from '../configuration';
let prefix : string = config.PREFIX;

export = {
    command: function() { return `latency` },

    description: function() { return `Check the ping connection between the Bot and Discord!` },

    usage: function() { return `${prefix}latency` },

    demo: function() { return `${prefix}latency` },

    category: function() { return `util` },

    operation: function(buggle: any, message: any, _options: any, _commands: any) {
        let latency = buggle.shards.get(0).latency;
        buggle.createMessage(message.channel.id, `🕐 Latency between Me and Discord is ${latency}ms.`)
    }
}
