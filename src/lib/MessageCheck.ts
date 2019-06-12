import config from '../configuration';

const sharkShit: string[] = [
    'baby shark','babyshark','baby-shark','b a b y s h a r k',
    'daddy shark','daddyshark','daddy-shark','d a d d y s h a r k',
    'mommy shark','mommyshark','mommy-shark','m o m m y s h a r k',
    'grandpa shark','grandpashark','grandpa-shark','g r a n d p a s h a r k',
    'grandma shark','grandmashark','grandma-shark','g r a n d m a s h a r k',
    'babie shark','bebie shark','shark baby','baby shurk','babi shark','babey shark',
    'вαвч shαrk'
];
const badLanguage: string[] = [
    'nigger','nigga','chink',' rape','nibba','ni🅱🅱a','ni:b::b:a','retard','negro','nazi','fag',
    'natsea',
];
const adultLanguage: string[] = [
    'cock','cunt','vagina','penis','porn','hentai','cum ','anal ','antiquing',
    'ahegao',' oral','humping','bdsm','anal ','nipple','cervix'
];

const sharkShitReg = new RegExp(sharkShit.join('|'), 'gmi');
const badLangReg = new RegExp(badLanguage.join('|'), 'gmi');
const adultLangReg = new RegExp(adultLanguage.join('|'), 'gmi');

export = {
    badLanguage: function(buggle: any, message: any) {
        if(badLangReg.test(message.content) && message.channel.id !== '549400876834488340') {
            message.delete('Deleted by BuggleAI for Bad Language!');
            buggle.createMessage(message.channel.id, 
                `Whoa there <@${message.author.id}>! That kind of language isn't welcome! Staff have been informed!`
            )
            buggle.createMessage(config.channels.BUGGLE_LOGS, { 
                embed: {
                    title: `Foul Language Notice`,
                    color: config.COLOR,
                    fields: [
                        {name: `User`, value: `<@${message.author.id}>`, inline: true},
                        {name: `Channel`, value: `<#${message.channel.id}>`, inline: true},
                        {name: `Message`, value: `${message.content}`, inline: false}
                    ],
                    thumbnail: { url: message.author.avatarURL }
                }
            })
        }
    },
    adultLanguage: function(buggle: any, message: any) {
        if(adultLangReg.test(message.content) 
            && message.author.id !== config.ID 
            && !message.channel.nsfw 
            && message.channel.id !== '549400876834488340') {
            message.delete('Deleted by BuggleAI for Adult Language!');
            buggle.createMessage(message.channel.id, 
                `Whoa there <@${message.author.id}>! That's pretty lewd! No adult language allowed!`
            )
        }
    },
    sharkLanguage: function(buggle: any, message: any) {
        if(sharkShitReg.test(message.content) && message.author.id !== config.ID) {
            message.delete('Deleted by BuggleAI for Baby Shark!');
            buggle.createMessage(message.channel.id, 
                `Hey <@${message.author.id}>! None of that "Baby Shark" shit in chat.`
            )
        }
    }
}
