import config from '../configuration';
let prefix : string = config.PREFIX;

import Moment from 'moment';

export = {
    command: function() { return `user` },

    description: function() { return `Look up a users Discord Profile in the server.` },

    usage: function() { return `${prefix}user <MENTION or ID>` },

    demo: function() { return `${prefix}submit <@570313370876510218>` },

    category: function() { return `util` },

    operation: function(buggle: any, message: any, options: any, commands: any) {
        if(!options[1]) {
            buggle.createMessage(message.channel.id, `You must ping a user or use their User ID.`);
        } else {
            let thisUserID = options[1].replace(/\D+/g, '');
            let thisUser = message.channel.guild.members.get(thisUserID);
            
            let userRoles = [];
            for(var i = 0; i < thisUser.roles.length; i++) {
                userRoles.push(message.channel.guild.roles.get(thisUser.roles[i]));
            }
            userRoles.sort(function(a, b) { return (b.position - a.position) })

            let displayRoles = [];
            for(let i = 0; i < userRoles.length; i++) {
                displayRoles.push(`<@&${userRoles[i].id}>`);
            }

            buggle.createMessage(message.channel.id, {
                embed: {
                    title: `User Profile >> ${thisUser.username}#${thisUser.discriminator}`,
                    description: `Below is the information about this user.`,
                    color: userRoles[0].color,
                    thumbnail: {
                        url: thisUser.avatarURL
                    },
                    fields: [
                        {
                            name: `User Mention`,
                            value: `${thisUser.username}#${thisUser.discriminator}`,
                            inline: true
                        },
                        {
                            name: `User ID`,
                            value: thisUser.id,
                            inline: true
                        },
                        {
                            name: `Nickname`,
                            value: (!thisUser.nick) ? 'N/A' : thisUser.nick,
                            inline: true
                        },
                        {
                            name: `Status`,
                            value: thisUser.status.toUpperCase(),
                            inline: true
                        },
                        {
                            name: `Account Created`,
                            value: new Moment(thisUser.createdAt).format('LLLL') + ' (EST)',
                            inline: false
                        },
                        {
                            name: `Account Joined`,
                            value: new Moment(thisUser.joinedAt).format('LLLL') + ' (EST)',
                            inline: false
                        },
                        {
                            name: `Roles`,
                            value: displayRoles.join(' '),
                            inline: false
                        }
                    ]
                }
            })
        }
    }
}
