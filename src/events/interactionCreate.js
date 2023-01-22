const Event = require('../structures/Event.js');
const { Collection } = require('discord.js');

module.exports = class Interaction extends Event {
    constructor(...args){
        super(...args)
        this.ratelimit = new Collection();
    }

    async run(interaction){
        if(interaction.isCommand()){
            await this.client.application?.commands.fetch()
			const guild = this.client.guilds.cache.get(interaction.guildId)
			const cmd = this.client.slashCommands.get(interaction.commandName)
            //const channel = this.client.channels.cache.get(interaction.channelId)
			//const member = this.client.users.cache.get(interaction.user.id)
			//const guildMember = await guild.members.fetch(interaction.user.id)

            //const ratelimit = this.ratelimit(interaction, cmd)
            //if (typeof rateLimit === "string") return interaction.reply({content: `${member.username}, espera **${rateLimit}** antes de volver a ejecutar **${cmd.name}**.`, ephemeral: true});
            
            if (interaction.commandName == cmd.name){
                await cmd.run(interaction, guild, interaction.options)
            }
        }

    }
}