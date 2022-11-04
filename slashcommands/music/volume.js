const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const vol = interaction.options.getNumber("amount");
    if (!vol) return interaction.editReply({ content: `🎧 | Âm lượng hiện tại là **${queue.volume}**%!` });
    if ((vol) < 0 || (vol) > 100) return interaction.editReply({ content: "❌ | Âm lượng nằm trong khoảng 0-100" });
    const success = queue.setVolume(vol);
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Âm lượng')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(success ? `✅ | Âm lượng được đặt là **${vol}%**!` : "❌ | Có gì đó sai sai!")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: [embed] });
}

module.exports = {
    name: "volume",
    category: "music",
    description: 'Tùy chỉnh âm lượng',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "amount",
            type: "NUMBER",
            description: "Từ 0-100",
            required: true
        }
    ], run
}