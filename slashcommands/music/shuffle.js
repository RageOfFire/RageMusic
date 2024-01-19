const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    await queue.shuffle();
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Tráo trộn')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription('✅ | Hàng đợi đã được tráo trộn!')
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: [embed] });
}

module.exports = {
    name: "shuffle",
    category: "music",
    description: 'Tráo trộn hàng đợi',
    permissions: [],
    devOnly: false, run
}