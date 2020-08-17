
import * as Discord from 'discord.js';
import { clearChannel, randomPokemon } from './functions.js';
const client = new Discord.Client();
import { config } from './config.js';
const { token, prefix } = config;

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    message.channel.messages
    if (message.content[0] === prefix) {
        const command = message.content.substr(1)
        switch (command) {
            case 'pokemon': randomPokemon(message, client); break;
            case 'clear': clearChannel(message);
                break;
            case 'channels':
                message.channel.send(message.guild.channels.cache.map((channel) => {
                    return `\nCANAL: ${channel.name}\nID: ${channel.id}\nTIPO: ${channel.type}`
                }))
                break;
        }
    }
});

client.login(token);