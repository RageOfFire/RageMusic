const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    await queue.back();
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Quay xe')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription('✅ | Chơi lại bài hát trước!')
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: [embed] });
}

module.exports = {
    name: "back",
    category: "music",
    description: 'Chơi lại bài hát trước',
    permissions: [],
    devOnly: false, run
}