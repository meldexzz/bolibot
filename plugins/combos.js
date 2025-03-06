let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.setCombos) {
        let combos = chat.setCombos;
        await conn.reply(m.chat, combos, m);
    } else {
        m.reply(`𝙉𝙤 𝙨𝙚 𝙝𝙖𝙣 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙞𝙙𝙤 𝙘𝙤𝙢𝙗𝙤𝙨, 𝙪𝙩𝙞𝙡𝙞𝙯𝙖 .𝙨𝙚𝙩𝙘𝙤𝙢𝙗𝙤𝙨 𝙥𝙖𝙧𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧 𝙪𝙣𝙤.🥖`);
    }
}
handler.command = ['combos'];
handler.group = true;
export default handler