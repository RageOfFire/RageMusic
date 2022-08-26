const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Đang chơi')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`🎶 | **[${queue.current.title}](${queue.current.url})**! (\`${perc.progress}%\`)`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .addFields(
        progress ? { name: '\u200b', value: progress } : 'Không có bài hát nào đang được chơi',
    )
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: embed });
}

module.exports = {
    name: "now",
    category: "music",
    description: 'Xem thông tin bài hát hiện tại',
    permissions: [],
    devOnly: false, run
}