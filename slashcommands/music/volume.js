const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const vol = interaction.options.getNumber("amount");
    if (!vol) return interaction.editReply({ content: `🎧 | Âm lượng hiện tại là **${queue.volume}**%!` });
    if ((vol) < 0 || (vol) > 100) return interaction.editReply({ content: "❌ | Âm lượng nằm trong khoảng 0-100" });
    const success = queue.setVolume(vol);
    return interaction.editReply({
        content: success ? `✅ | Âm lượng được đặt là **${vol}%**!` : "❌ | Có gì đó sai sai!"
    });
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