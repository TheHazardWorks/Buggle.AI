"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modules_1 = __importDefault(require("./lib/Modules"));
const Logger_1 = __importDefault(require("./lib/Logger"));
const configuration_1 = __importDefault(require("./configuration"));
const commands = __importStar(require("./commands"));
let buggleBot = new Modules_1.default.ENGINE(configuration_1.default.TOKEN);
let commandList = commands.default;
let downTime = configuration_1.default.DOWNTIME || false;
let prefix = configuration_1.default.PREFIX || buggleBot.user.mention;
let log = new Logger_1.default();
process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
    yield log.success('process', `CTRL + C was executed...`);
    return process.exit(2);
}));
process.on('unhandledRejection', (event) => __awaiter(this, void 0, void 0, function* () {
    log.error('process', event);
}));
buggleBot.on('ready', () => { log.brand(); });
buggleBot.on('disconnect', () => {
    log.error('client', 'Session has disconnected...');
});
buggleBot.on('error', (error, id) => {
    log.error('shard:' + id, error);
});
buggleBot.on('warn', (message, id) => {
    log.warn('shard:' + id, message);
});
buggleBot.on('guildMemberRemove', (_guild, user) => {
    buggleBot.createMessage(configuration_1.default.channels.WELCOME, `**${user.username}#${user.discriminator}** flew too high, fading off into the distance never to be seen again.`);
});
buggleBot.on('guildMemberAdd', (guild, user) => {
    buggleBot.createMessage(configuration_1.default.channels.WELCOME, {
        content: `Welcome <@${user.id}>, to the ${guild.name} Discord Server!`,
        embed: {
            thumbnail: { url: guild.iconURL },
            color: configuration_1.default.COLOR,
            description: `Welcome to the ${guild.name}! We are happy to have you!`,
            fields: [
                { name: `The Rules?`, value: `Check them out here: <#541809436776464394>`, inline: false },
                { name: `How to make a Buggle?`, value: `Follow the tutorial here: <#541809847948279818>`, inline: false }
            ]
        }
    });
    user.addRole('541806920814690324', 'New member joined the server!').then(() => {
        log.success('members', `New member joined: ${user.id}`);
    }, (error) => log.error('members', error));
});
buggleBot.on('messageCreate', (message) => {
    let devMentions = ['seven', '707', 'yournetworknerd'];
    let devMention = new RegExp(devMentions.join('|'), 'gmi');
    if (devMention.test(message.content)) {
        buggleBot.getDMChannel(configuration_1.default.DEVELOPER).then((channel) => {
            buggleBot.createMessage(channel.id, { embed: {
                    title: `You were mentioned...`,
                    color: configuration_1.default.COLOR,
                    description: message.content,
                    fields: [
                        { name: `User`, value: `<@${message.author.id}>`, inline: true },
                        { name: `Channel`, value: `<#${message.channel.id}>`, inline: true }
                    ]
                } });
        });
    }
});
buggleBot.connect();
//# sourceMappingURL=index.js.map
