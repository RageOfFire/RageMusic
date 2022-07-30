const { QueryType } = require("discord-player");
const run = async({client, interaction, player}) => {
    if (!interaction.member.voice.channel) 
    return interaction.reply({content: "Bạn cần ở trong kênh thoại để sử dụng lệnh này", ephemeral: true })
    else if(interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
    return interaction.reply({content: "Bạn không ở cùng kênh thoại với tôi", ephemeral: true })
    await interaction.deferReply();
    const keyword = interaction.options.getString("keyword");
    const searchResult = await player
    .search(keyword, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_SEARCH
    })
    .catch(() => {});
    if (!searchResult || !searchResult.tracks.length) return interaction.editReply({ content: "Không tìm thấy kết quả" });

    const queue = await player.createQueue(interaction.guild, {
        metadata: interaction.channel
    });

    try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
        player.deleteQueue(interaction.guildId);
        return interaction.editReply({ content: "không thể vào kênh thoại của bạn" });
    }

    await interaction.editReply({ content: `⏱ | Đang tải ${searchResult.playlist ? "danh sách" : "bài hát"}...` }).catch((err) => {console.log(err)});
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) await queue.play();
}

module.exports = {
    name: "search",
    category: "music",
    description: 'Tìm kiếm bài hát',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "keyword",
            type: "STRING",
            description: "Từ khóa",
            required: true
        }
    ], run
}