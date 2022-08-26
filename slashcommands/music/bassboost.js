const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    await queue.setFilters({
        bassboost: !queue.getFiltersEnabled().includes("bassboost"),
        normalizer2: !queue.getFiltersEnabled().includes("bassboost")
    });
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('BassBoost')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`🎵 | Bassboost ${queue.getFiltersEnabled().includes("bassboost") ? "đã bật" : "đã tắt"}!`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: embed });
}

module.exports = {
    name: "bassboost",
    category: "music",
    description: 'Tăng cường âm thanh',
    permissions: [],
    devOnly: false, run
}