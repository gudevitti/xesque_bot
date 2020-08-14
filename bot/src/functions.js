
import { config } from './config.js';
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

export { clearChannel }