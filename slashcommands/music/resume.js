const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const paused = queue.setPaused(false);
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Tiếp tục')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(!paused ? "❌ | Có gì đó sai sai!" : "▶ | Tiếp tục!")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: [embed] });
}

module.exports = {
    name: "resume",
    category: "music",
    description: 'Tiếp tục bài hát',
    permissions: [],
    devOnly: false, run
}