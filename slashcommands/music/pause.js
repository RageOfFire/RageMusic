const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const paused = queue.setPaused(true);
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Tạm dừng')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(paused ? "⏸ | Tạm dừng!" : "❌ | Có gì đó sai sai!")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: embed });
}

module.exports = {
    name: "pause",
    category: "music",
    description: 'Tạm dừng bài hát',
    permissions: [],
    devOnly: false, run
}