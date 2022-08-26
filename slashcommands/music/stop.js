const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    queue.destroy();
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Dừng')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription("🛑 | Dừng bài hát! Xóa hàng đợi...")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: embed });
}

module.exports = {
    name: "stop",
    category: "music",
    description: 'Dừng phát nhạc, xóa hàng đợi',
    permissions: [],
    devOnly: false, run
}