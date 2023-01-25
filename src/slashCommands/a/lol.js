// const SlashCommand = require("../structures/slashCommands")
const SlashCommand = require("../../structures/slashCommands")
const { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js")
const Canvas = require("canvas")
const { regions, rankImage, rankColors } = require("../../utils/LeagueOfLegends.js")

module.exports = class Test extends SlashCommand {
    constructor(...args){
        super(...args, {
            name: 'lol',
            description: 'lolsito',
            type: ApplicationCommandType.ChatInput,
			options: [
				{
					name: "summoner",
					description: "Summoner name",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
				{
					name: "region",
					description: "Summoner region",
					type: ApplicationCommandOptionType.String,
					required: true,
					choices: Object.entries(regions).map(([key, value]) => { return { name: key, value: value } })
				}
			]
        })
    }

    async run(interaction, guild, options){

		interaction.deferReply({ fetchReply: true })
		const summoner = options.getString("summoner")
		const region = options.getString("region")
		// console.log(summoner, region)
		try{

			// --------- Get summoner data ---------
			const summ = await interaction.client.lol.Summoner.getByName(summoner, region)

			// name & level
			const name  = summ.response.name
			const level = summ.response.summonerLevel
			const icon_id = summ.response.profileIconId

			// version

			const version = await interaction.client.lol.DataDragon.getVersions()

			// ranked

			const ranked = await interaction.client.lol.League.bySummoner(summ.response.id, region)
			// console.log(ranked.response[0])
			
			// --------- Get summoner data ---------

			// --------- Create canvas ---------
			const canvas = Canvas.createCanvas(800, 550)
			const ctx = canvas.getContext('2d')

			// --------- Register fonts ---------

			Canvas.registerFont('./src/assets/fonts/Poppins-Bold.ttf', { family: 'PoppinsBold' })
			Canvas.registerFont('./src/assets/fonts/Poppins-BoldItalic.ttf', { family: 'PoppinsBoldItalic' })

			// --------- Draw background ---------
			const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/819724275169755156/1067550243572428912/Mythmaker-Irelia---Final.jpg')
			ctx.drawImage(background, 0, 0, canvas.width, 450)

			// --------- Draw skeleton ---------
			const skeleton = await Canvas.loadImage('./src/assets/images/skeleton.png')
			ctx.drawImage(skeleton, 0, 0, canvas.width, canvas.height)

			// --------- Draw avatar ---------
			const avatar = await Canvas.loadImage(`http://ddragon.leagueoflegends.com/cdn/${version[0]}/img/profileicon/${icon_id}.png`)
			ctx.drawImage(avatar, 30, 130, 100, 95)

			const border_avatar = await Canvas.loadImage('./src/assets/images/profile_border.png')
			ctx.drawImage(border_avatar, 20, 120, 116, 113)

			// --------- Draw soloq ---------
			const isSoloq = ranked.response.find(queue => queue.queueType === "RANKED_SOLO_5x5")
			const tierSq = isSoloq?.tier ?? "UNRANKED"
			console.log(tierSq, rankImage[tierSq])

			// icon rank
			const icon_soloq = await Canvas.loadImage(rankImage[tierSq])
			ctx.drawImage(icon_soloq, 40, 325, 96, 100)
			
			//rank

			ctx.font = '14px "PoppinsBold"'
			ctx.fillStyle = rankColors[tierSq]
			ctx.textAlign = 'center'
			ctx.fillText(isSoloq?.tier ?? "UNRANKED", 226, 346)

			// wins text

			ctx.font = '14px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'left'
			ctx.fillText('WINS:', 154, 380)

			// wins number

			ctx.font = '14px "PoppinsBold"'
			ctx.fillStyle = '#2CAF70'
			ctx.textAlign = 'left'
			ctx.fillText(isSoloq?.wins ?? 0, 200, 380)

			// lost	text

			ctx.font = '14px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'left'
			ctx.fillText("LOST:", 154, 400)

			// lost	number

			ctx.font = '14px "PoppinsBold"'
			ctx.fillStyle = '#E75B5B'
			ctx.textAlign = 'left'
			ctx.fillText(isSoloq?.losses ?? 0, 200, 400)

			// lp text

			ctx.font = '14px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'left'
			ctx.fillText("LP:", 154, 420)

			// lp number

			ctx.font = '14px "PoppinsBold"'
			ctx.fillStyle = '#6F72C1'
			ctx.textAlign = 'left'
			ctx.fillText(isSoloq?.leaguePoints ?? 0, 180, 420)

			// winrate
			const winrate = isSoloq?.wins / (isSoloq?.wins + isSoloq?.losses) * 100 ?? 0
			ctx.font = '11px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'center'
			ctx.fillText(`${isNaN(winrate) ? 0 : winrate.toFixed(2)}%`, 270, 396)

			// --------- Draw flex ---------

			// icon rank

			const isFlex = ranked.response.find(queue => queue.queueType === "RANKED_FLEX_SR")
			const tierFl = isFlex?.tier ?? "UNRANKED"

			const icon_flex = await Canvas.loadImage(rankImage[tierFl])
			ctx.drawImage(icon_flex, 425, 300, 60, 75)

			//rank

			ctx.font = '10px "PoppinsBold"'
			ctx.fillStyle = rankColors[tierFl]
			ctx.textAlign = 'center'
			ctx.fillText(isFlex?.tier ?? "UNRANKED", 538, 318)

			// wins text

			ctx.font = '10px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'left'
			ctx.fillText('WINS:', 490, 350)

			// wins number

			ctx.font = '10px "PoppinsBold"'
			ctx.fillStyle = '#2CAF70'
			ctx.textAlign = 'left'
			ctx.fillText(isFlex?.wins ?? 0, 525, 350)

			// lost	text

			ctx.font = '10px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'left'
			ctx.fillText("LOST:", 490, 365)

			// lost	number

			ctx.font = '10px "PoppinsBold"'
			ctx.fillStyle = '#E75B5B'
			ctx.textAlign = 'left'
			ctx.fillText(isFlex?.losses ?? 0, 525, 365)

			// lp text

			ctx.font = '10px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'left'
			ctx.fillText("LP:", 550, 350)

			// lp number

			ctx.font = '10px "PoppinsBold"'
			ctx.fillStyle = '#6F72C1'
			ctx.textAlign = 'left'
			ctx.fillText(isFlex?.leaguePoints ?? 0, 570, 350)

			// winrate

			const winrateFl = isFlex?.wins / (isFlex?.wins + isFlex?.losses) * 100 ?? 0
			ctx.font = '8px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'center'
			ctx.fillText(`${isNaN(winrateFl) ? 0 : winrateFl.toFixed(2)}%`, 648, 330)

			// --------- Draw name ---------
			ctx.font = '24px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'left'
			ctx.fillText(name, 148, 210)

			// --------- Draw level ---------
			ctx.font = '14px "PoppinsBold"'
			ctx.fillStyle = '#DADADA'
			ctx.textAlign = 'left'
			ctx.fillText(`Lvl ${level}`, 148, 230)

			// --------- Draw patch version ---------
			ctx.font = '16px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'center'
			ctx.fillText(`V${version[0]}`, 710, 50)

			// --------- Draw bot version ---------
			ctx.font = '16px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'center'
			ctx.fillText(`V1.0`, 710, 102)

			// --------- Draw bot version ---------
			ctx.font = '16px "PoppinsBold"'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'center'
			ctx.fillText(`V1.0`, 710, 102)

			// --------- Draw mastery champs ---------

			const mastery = await interaction.client.lol.Champion.masteryBySummoner(summ.response.id, region)
			const masteryChamps = mastery.response.slice(0, 3)
			const masteryChampsId = masteryChamps.map(champ => champ.championId)
			const link = (id) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${id}.png`

			// icon champs

			for (let i = 0; i < masteryChampsId.length; i++) {
				const icon_champ = await Canvas.loadImage(link(masteryChampsId[i] ?? -1))
				ctx.drawImage(icon_champ, 458 + (i * 113), 436, 48, 48)
			}

			// border champs

			for (let i = 0; i < masteryChampsId.length; i++) {
				const border_champ = await Canvas.loadImage(`./src/assets/images/ChampRect${i+1}.png`)
				ctx.drawImage(border_champ, 450 + (i * 113), 432, 60, 55)
			}

			console.log(masteryChampsId)

			// --------- create buffer ---------
			const attachment = new AttachmentBuilder(await canvas.toBuffer('image/png'), { name: `league_${name.split()}.png` })
		
			// await interaction.deleteReply()
			await interaction.editReply({ files: [attachment] })
		} catch(e) {
			console.log(e)
			interaction.editReply({ content: "Algo salió mal." })
		}

	}
}