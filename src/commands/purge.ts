import config from '../configuration';
let prefix : string = config.PREFIX;

export = {
    command: function() { return `purge` },

    description: function() { return `Purge an ammount of messages from a channel.` },

    usage: function() { return `${prefix}purge <NUMBER>` },

    demo: function() { return `${prefix}purge 100` },

    category: function() { return `moderation` },

    operation: function(buggle: any, message: any, options: any, commands: any) {
        let thisAuthor = message.channel.guild.members.get(message.author.id);
        if(thisAuthor.permission.has('manageMessages')) {
            if(!options[1]) {
                buggle.purgeChannel(message.channel.id, Infinity);
                setTimeout(function() {
                    buggle.createMessage(message.channel.id, `Purged all messages! (As many as possible!)`);
                }, 666);
            } else {
                buggle.purgeChannel(message.channel.id, parseInt(options[1]));
                setTimeout(function() {
                    buggle.createMessage(message.channel.id, `Purged ${options[1]} messages!`);
                }, 666);
            }
        } else {
            buggle.createMessage(message.channel.id, `You do not have permission to use this command!`);
        }
    }
}
