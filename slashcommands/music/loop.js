const { QueueRepeatMode } = require("discord-player");
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const loopMode = interaction.options.getInteger("mode");
    const success = queue.setRepeatMode(loopMode);
    const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
    return interaction.editReply({ content: success ? `${mode} | Cập nhật vòng lặp!` : "❌ | Không thể cập nhật vòng lặp!" });
}

module.exports = {
    name: "loop",
    category: "music",
    description: 'Tùy chỉnh vòng lặp',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "mode",
            type: "INTEGER",
            description: "Cách lặp",
            required: true,
            choices: [
                {
                    name: "Tắt",
                    value: QueueRepeatMode.OFF
                },
                {
                    name: "Bài hát",
                    value: QueueRepeatMode.TRACK
                },
                {
                    name: "Hàng chờ",
                    value: QueueRepeatMode.QUEUE
                },
                {
                    name: "Tự động",
                    value: QueueRepeatMode.AUTOPLAY
                }
            ]
        }
    ], run
}