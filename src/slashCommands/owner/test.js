// const SlashCommand = require("../structures/slashCommands")
const SlashCommand = require("../../structures/slashCommands")
const { ApplicationCommandType } = require("discord.js")

module.exports = class Test extends SlashCommand {
    constructor(...args){
        super(...args, {
            name: 'test',
            description: 'Comando de prueba',
            type: ApplicationCommandType.ChatInput,
        })
    }

    async run(interaction, guild, options){
        await interaction.reply({content: 'Hola mundo'})
    }
}