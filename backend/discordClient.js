const Discord = require('discord.js');
const client = new Discord.Client();
const License = require('./models/license');
const serverID = "560600001059880991"; // add to config
const roleID = "584952716799901705"; // add to config
const prefix = "?";

const initClient = () => {
    client.login(process.env.DISCORD_TOKEN);
    client.once('ready', () => {
        console.log('Discord client is ready');
    });
}

// via private DM
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

        if (foundKey.discordID !== authorID || foundKey.status.binded == false){
            message.channel.send("Unauthorized");
            return;
        }

        if (foundKey.paymentInfo.dates.period_end < Math.round((new Date()).getTime() / 1000)){
            message.channel.send("Expired");
            return;
        }

        await foundKey.updateOne({status: {activated: true, binded: true}}, (err, result)=>{
            if (err){
                message.channel.send("Error");
            } else {
                client.guilds.cache.get(serverID).members.cache.get(authorID).roles.add(roleID);
                message.channel.send(`${foundKey.key} Activated`);
            }
        });
    } 
});

const removeRole = (discordID) => {
    client.guilds.cache.get(serverID).members.cache.get(discordID).roles.remove(roleID);
}

module.exports = { initClient, removeRole };
