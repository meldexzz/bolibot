let toM = a => '@' + a.split('@')[0];

function handler(m, { args }) {
    if (!args.length) return m.reply('✦ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝙊𝙎 𝙋𝘼𝙍𝙏𝙄𝘾𝙄𝙋𝘼𝙉𝙏𝙀𝙎 𝘿𝙀𝙇 𝙎𝙊𝙍𝙏𝙀𝙊 🎟️');

    let participantes = args.map(v => v.replace(/[@]/g, '') + '@s.whatsapp.net');
    let ganador = participantes[Math.floor(Math.random() * participantes.length)];

    m.reply(`🎉✨ 𝘼𝙏𝙀𝙉𝘾𝙄Ó𝙉 𝙋𝘼𝙍𝙏𝙄𝘾𝙄𝙋𝘼𝙉𝙏𝙀𝙎 ✨🎉\n\n💫 𝙀𝙇 𝙂𝘼𝙉𝘼𝘿𝙊𝙍 𝙀𝙎: ${toM(ganador)} 🏆\n\n𝙁𝙀𝙇𝙄𝘾𝙄𝘿𝘼𝘿𝙀𝙎 🎊`, null, {
        mentions: [ganador]
    });
}

handler.help = ['sorteo'];
handler.tags = ['fun'];
handler.command = ['sorteo'];
handler.group = true;

export default handler;
