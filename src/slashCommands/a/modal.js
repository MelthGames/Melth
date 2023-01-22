// const SlashCommand = require("../structures/slashCommands")
const SlashCommand = require("../../structures/slashCommands")
const { ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

module.exports = class Test extends SlashCommand {
    constructor(...args){
        super(...args, {
            name: 'modal',
            description: 'Comando de prueba',
            type: ApplicationCommandType.ChatInput,
        })
    }

    async run(interaction, guild, options){
        // await interaction.reply({content: 'Creando modal...'})
        // await interaction.followUp();
        const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');

		// Add components to modal

		// Create the text input components
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
    }
}