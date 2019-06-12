import config from '../configuration';
let prefix : string = config.PREFIX;

export = {
    command: function() { return `help` },

    description: function() { return `See a list of commands or look up one specifically!` },

    usage: function() { return `${prefix}help <COMMAND?>` },

    demo: function() { return `${prefix}help latency` },

    category: function() { return `util` },

    operation: function(buggle: any, message: any, options: any, commands: any) {
        if(!options[1]) {
            let randomComms = [], utilComms = [], modComms = [], buggleComms = [];
            for(let i = 0; i < commands.length; i++) {
                if(commands[i].category() == 'random') { randomComms.push(commands[i].command()) };
                if(commands[i].category() == 'util') { utilComms.push(commands[i].command()) };
                if(commands[i].category() == 'moderation') { modComms.push(commands[i].command()) };
                if(commands[i].category() == 'buggle') { buggleComms.push(commands[i].command()) };

                buggle.createMessage(message.channel.id, {
                    embed: {
                        title: `Commands List`,
                        color: config.COLOR,
                        thumbnail: { url: message.author.avatarURL },
                        fields: [
                            {name: `Random Commands`, value: randomComms.join(', '), inline: false},
                            {name: `Utility Commands`, value: utilComms.join(', '), inline: false},
                            {name: `Buggle Commands`, value: buggleComms.join(', '), inline: false},
                            {name: `Moderative Commands`, value: modComms.join(', '), inline: false}
                        ]
                    }
                })
            }
        } else {
            let command: any = {}, isCommand: boolean = false;
            for(let i = 0; i < commands.length; i++) {
                if(options[1].toLowerCase() == commands[i].command()) {
                    command.command = commands[i].command();
                    command.usage = commands[i].usage();
                    command.demo = commands[i].demo();
                    command.description = commands[i].description();
                    isCommand = true;
                }
            }
            if(!isCommand) {
                buggle.createMessage(message.channel.id, `This is not a command I have!`);
            } else {
                buggle.createMessage(message.channel.id, {
                    embed: {
                        title: `Command >> ${command.command}`,
                        color: config.COLOR,
                        thumbnail: { url: message.author.avatarURL },
                        fields: [
                            {name: `Description`, value: command.description, inline: false},
                            {name: `How To Use`, value: command.usage, inline: false},
                            {name: `Demonstration`, value: command.demo, inline: false}
                        ]
                    }
                })
            }
        }
    }
}
