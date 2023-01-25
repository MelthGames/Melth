const { Client, Collection, Options, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const Util = require('./utils/index.js')
const { LolClient } = require('./utils/LeagueOfLegends.js')
// console.log(LolClient())
require("dotenv").config();
const token = process.env.token

module.exports = class Melth extends Client{
    constructor(options = {}){
        super({
            partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages
            ],
            makeCache: Options.cacheWithLimits({
                MessageManager: 200,
                GuildMemberManager: {
                    maxSize: 200,
                    keepOverLimit: (member) => member.id === client.user.id,
                },
            }),
        })

        this.events = new Collection()
        this.slashCommands = new Collection()
        this.utils = new Util(this)
        this.lol = LolClient()
    }

    async start(){
        this.utils.loadEvents()
        this.utils.loadInteractions()
    
        this.login(token)
    }
}