import Modules from './lib/Modules';
import Logger from './lib/Logger';

import config from './configuration';

import * as commands from './commands';

let buggleBot = new Modules.ENGINE(config.TOKEN);

let commandList: any[] = [];
let downTime: boolean = config.DOWNTIME || false;
let log: any = new Logger();

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

buggleBot.connect();
