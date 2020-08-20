
import { config } from './config.js';
import bent from 'bent';
const { emoji } = config;
function clearChannel(message) {
    //Check the user has permission and that it's on dev channel
    if (message.member.hasPermission("ADMINISTRATOR") && message.channel.name === 'dev') {

        //Send message and mark reactions
        message.channel.send("Você está prestes a deletar muitas mensagens. Senta o pau?")
            .then((m) => m.react(emoji.check_mark_button).then(() => m.react(emoji.x)).then(() => {

                console.log(m.reactions.cache.first().count)

                //Creates filter for selecting the trigger reaction
                const filter = () => m.reactions.cache.first().count > 1

                const collector = message.channel.lastMessage.createReactionCollector(filter, 1500)
                collector.on('collect', () => {
                    m.channel.messages.fetch()
                        .then((list) => {
                            //BE REALLY CAREFULL WITH message.channel.delete() AS IT DELETES THE CHANNEL
                            message.channel.bulkDelete(list)
                                .then(() => {
                                    m.channel.send("Mensagens limpas! (e essa daqui a 5 segundos)").then((x) => x.delete({ timeout: 5000 }));
                                });
                        }, (err) => { message.channel.send("ERROR: ERROR CLEARING CHANNEL") })
                })

                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} items`);
                });
            }))


    } else {
        message.channel.send(`Tá louco, broder?`)
    }
}

async function randomPokemon(message) {
    const pokemon1 = Math.round(Math.random() * 150) + 1;
    const pokemon2 = Math.round(Math.random() * 150) + 1;

    const getJSON = bent('json')
    try {

        let obj1 = await getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`)
        let obj2 = await getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`)
        const pokeName = obj2.name.slice(0, obj2.name.length/2 + 1) + obj1.name.slice(obj1.name.length/2, obj1.name.length)

        message.channel.send(`${pokeName.toUpperCase()}`, {files: [`https://images.alexonsager.net/pokemon/fused/${pokemon1}/${pokemon1}.${pokemon2}.png`]})
    } catch (err) {
        console.log(err.statusCode);
        console.log(`Não achei ${pokemon1} + ${pokemon2}`)
        message.channel.send("PokeAPI morreu :(")
    }

}

export { clearChannel, randomPokemon }