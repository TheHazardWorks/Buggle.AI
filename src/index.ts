import Modules from './lib/Modules';
import Logger from './lib/Logger';
import messageCheck from './lib/MessageCheck';

import config from './configuration';

import * as commands from './commands';

let buggleBot = new Modules.ENGINE(config.TOKEN);

let commandList: any[] = commands.default;
let downTime: boolean = config.DOWNTIME || false;
let prefix: string = config.PREFIX || buggleBot.user.mention;
let log: any = new Logger({
    name: 'Buggle.AI',
    copyright: 'The Buggle Species'
});

process.on('SIGINT', async () => {
	await log.success('process', `CTRL + C was executed...`);
	return process.exit(2);
});
process.on('unhandledRejection', async (event: any) => {
    log.error('process', event);
})

buggleBot.on('ready', () => { log.brand() });

buggleBot.on('disconnect', () => {
    log.error('client', 'Session has disconnected...');
})

buggleBot.on('error', (error: any, id: any) => {
    log.error('shard:' + id, error);
})

buggleBot.on('warn', (message: any, id: any) => {
	log.warn('shard:' + id, message);
})

buggleBot.on('guildMemberRemove', (_guild: any, user: any) => {
    buggleBot.createMessage(config.channels.WELCOME, 
        `**${user.username}#${user.discriminator}** flew too high, fading off into the distance never to be seen again.`
    );
})

buggleBot.on('guildMemberAdd', (guild: any, user: any) => {
    buggleBot.createMessage(config.channels.WELCOME, {
        content: `Welcome <@${user.id}>, to the ${guild.name} Discord Server!`,
        embed: {
            thumbnail: { url: guild.iconURL },
            color: config.COLOR,
            description: `Welcome to the ${guild.name}! We are happy to have you!`,
            fields: [
                {name: `The Rules?`, value: `Check them out here: <#541809436776464394>`, inline: false},
                {name: `How to make a Buggle?`, value: `Follow the tutorial here: <#541809847948279818>`, inline: false}
            ]
        }
    })
    user.addRole('541806920814690324', 'New member joined the server!').then(() => {
        log.success('members', `New member joined: ${user.id}`);
    }, (error: any) => log.error('members', error));
})

buggleBot.on('messageCreate', (message: any) => {
    let devMentions: string[] = ['seven','707','yournetworknerd'];
    let devMention: any = new RegExp(devMentions.join('|'), 'gmi');

    if(devMention.test(message.content)) {
        buggleBot.getDMChannel(config.DEVELOPER).then((channel: {id: string}) => {
            buggleBot.createMessage(channel.id, { embed: {
                title: `You were mentioned...`,
                color: config.COLOR,
                description: message.content,
                fields: [
                    {name: `User`, value: `<@${message.author.id}>`, inline: true},
                    {name: `Channel`, value: `<#${message.channel.id}>`, inline: true}
                ]
            }})
        })
    }

    if(!message.channel.guild) {
        buggleBot.getDMChannel(config.DEVELOPER).then((channel: {id: string}) => {
            buggleBot.createMessage(channel.id, { embed: {
                title: `You were mentioned...`,
                color: config.COLOR,
                description: message.content,
                fields: [
                    {name: `User`, value: `<@${message.author.id}>`, inline: true},
                    {name: `Channel`, value: 'Direct Message', inline: true}
                ]
            }})
        })
        if(message.attachments && message.attachments.length >= 1) {
            for(let i = 0; i < message.attachments.length; i++) {
                buggleBot.getDMChannel(config.DEVELOPER).then((channel: {id: string}) => {
                    buggleBot.createMessage(channel.id, JSON.stringify(message.attachments[i]));
                })
            }
        }
    }

    messageCheck.badLanguage(buggleBot, message);
    messageCheck.adultLanguage(buggleBot, message);
    messageCheck.sharkLanguage(buggleBot, message);

    if(message.content.toLowerCase().startsWith(prefix)) {
        let options : string[] = message.content.replace(prefix, '').trim().split(' ');
        let isCommand : boolean = false;
        for(let i = 0; i < commandList.length; i++) {
            if(options[0].toLowerCase() == commandList[i].command().toLowerCase()) {
                commandList[i].operation(buggleBot, message, options, commandList);
                isCommand = true;
            }
        }
        if(!isCommand) {
            log.warn('command', `User command failed: "${options[0]}"`);
            buggleBot.createMessage(message.channel.id, `That is not a valid command!`);
        }
    }
})

buggleBot.connect();
