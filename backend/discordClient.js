const Discord = require('discord.js');
const client = new Discord.Client();
const License = require('./models/license');
const config = require('./config.json');
const serverID = config.discord.serverID; 
const roleID = config.discord.roleID; 
const prefix = config.discord.prefix;

const initClient = () => {
    client.login(process.env.DISCORD_TOKEN);
    client.once('ready', () => {
        console.log('Discord client is ready');
    });
}

client.on('message', async (message) => {
    if (message.content.startsWith(`${prefix}activate`)) {
        const key = message.content.split(' ')[1];
        const authorID = message.author.id;

        if (!key) {
           message.channel.send("Invalid key");
           return;
        }

        const foundKey = await License.findOne({key: key});

        if (foundKey === null){
            message.channel.send("Key not found");
            return;
        }

        if (foundKey.status.activated == true){
            message.channel.send("Already Activated");
            return;
        }

        if (foundKey.discordID !== authorID){
            message.channel.send("Unauthorized");
            return;
        }

        if (foundKey.paymentInfo.dates.period_end < Math.round((new Date()).getTime() / 1000)){
            message.channel.send("Expired");
            return;
        }

        await foundKey.updateOne({status: {activated: true, cancel_period_end: foundKey.status.cancel_period_end}}, (err, result)=>{
            if (err){
                message.channel.send("Error");
            } else {
                client.guilds.cache.get(serverID).members.fetch(authorID).then((r)=>{
                    r.roles.add(roleID);
                });
                
                message.channel.send(`${foundKey.key} Activated`);
            }
        });
    } 
});

const removeRole = (discordID) => {
    client.guilds.cache.get(serverID).members.cache.get(discordID).roles.remove(roleID);
}

module.exports = { initClient, removeRole };
