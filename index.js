const Client = require('./src/bot.js')
const bot = new Client()
// const { LolClient } = require('./src/utils/LeagueOfLegends.js')

// LolClient(bot)

bot.on('messageCreate', async message => {
    //message.channel.send("si")
    //console.log("a")
    if(!bot.application?.owner) await bot.application?.fetch()

    if(message.content.toLowerCase() === `!reload` && message.author.id === bot.application?.owner.id){
    let slash = []
    // console.log(bot.slashCommands)
    bot.slashCommands.forEach(e => {
        slash.push({
            name: e.name,
            description: e.description,
            options: e.options,
            type: e.type
        })
    })
    // bot.guilds.cache.forEach(async guild => {
    //     await bot.guilds.cache.get(guild.id)?.commands.set(slash).catch(err => console.log(err))
    //     console.log(bot)
    // })
    console.log(slash)
    // bot.application?.commands.set(slash)
    bot.guilds.cache.get("871286464472817734")?.commands.set(slash)
    .catch(err => console.log(err))
    .then(console.log)
    // message.channel.send('comandos setiado')
    }

    if (message.content.toLowerCase() === '!delete') {
        bot.application?.commands.delete('860194936364204055')
        .then(console.log)
        .catch(console.error);
    }
})

bot.start()
console.log("iniciado")
