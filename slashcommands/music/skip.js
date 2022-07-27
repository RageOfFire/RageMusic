const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const currentTrack = queue.current;
    const success = queue.skip();
    return interaction.editReply({
        content: success ? `✅ | Bỏ qua **${currentTrack}**!` : "❌ | Có gì đó sai sai!"
    });
}

module.exports = {
    name: "skip",
    category: "music",
    description: 'Bỏ qua bài hát hiện tại',
    permissions: [],
    devOnly: false, run
}