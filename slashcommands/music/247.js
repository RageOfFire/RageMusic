const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    const mode = interaction.options.getInteger("mode");
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    if(queue) {
        if(mode == 1) {
            queue.options.leaveOnEnd = false;
            queue.options.leaveOnStop = false;
            queue.options.leaveOnEmpty = false;
            queue.options.initialVolume = 80;
            queue.options.bufferingTimeout = 200;
            interaction.editReply({ content: '✅ | Đã bật chế độ 24/7!' })
        }
        if (mode == 0) {
            queue.options.leaveOnEnd = false;
            queue.options.leaveOnStop = true;
            queue.options.leaveOnEmpty = true;
            queue.options.leaveOnEmptyCooldown = 60 * 1000 * 3;
            interaction.editReply({ content: '✅ | Đã tắt chế độ 24/7!' })
        }
    }
}

module.exports = {
    name: "247",
    category: "music",
    description: 'Bật chế độ 24/7',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "mode",
            type: "INTEGER",
            description: "Bật/tắt chế độ 24/7",
            required: true,
            choices: [
                {
                    name: "Tắt",
                    value: 0
                },
                {
                    name: "Bật",
                    value: 1
                }
            ]
        }
    ], run
}