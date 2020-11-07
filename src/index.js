
import * as Discord from 'discord.js';
import { clearChannel, randomPokemon, getLolMastery } from './functions.js';
const client = new Discord.Client();
import { config } from '../config.js';
const { token, prefix } = config;

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content[0] === prefix) {
        const [command, param1, param2] = message.content.slice(1).split('/');
        console.log(command,param1,param2);
        switch (command.toLowerCase()) {
            case 'pokemon': randomPokemon(message, param1, param2); break;
            case 'clear': clearChannel(message); break;
            case 'mastery': getLolMastery(message, param1, param2); break;
        }
    }
});

client.login(token);