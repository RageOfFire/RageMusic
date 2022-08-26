const { MessageEmbed } = require('discord.js')
const { getFiles } = require("../../util/functions")
const fs = require("fs")

const run = async ({client, interaction, player}) => {
	let HelpCMD = 'Tất cả lệnh:\n\n';
	fs.readdirSync('./slashcommands/').forEach((category) => {
		let commands = getFiles(`./slashcommands/${category}`, ".js")
		commands.forEach((f) => {
			const command = require(`../${category}/${f}`)
			HelpCMD += `🔶/${command.name}: ${command.description}\n\n`
		})
	})
	const embed = new MessageEmbed()
		.setColor('#faa152')
		.setTitle('Hướng dẫn')
		.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
		.setDescription(HelpCMD)
		.setThumbnail(client.user.displayAvatarURL())
		.setTimestamp()
		.setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
	interaction.reply({ embeds: [embed] }).catch((err) => {console.log(err)});
}

module.exports = {
	name: "help",
	category: "info",
	description: 'Xem hướng dẫn',
	permissions: [],
	devOnly: false, run
}