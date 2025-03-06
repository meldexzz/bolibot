let handler = async (m, { conn, text, isROwner, isOwner }) => {

if (text) {
global.db.data.chats[m.chat].setcatalogo = text
conn.reply(m.chat, '𝙀𝙡 𝙘𝙖𝙩𝙖𝙡𝙤𝙜𝙤 𝙝𝙖 𝙨𝙞𝙙𝙤 𝙘𝙤𝙣𝙛𝙞𝙜𝙪𝙧𝙖𝙙𝙤.🥖', m)

} else throw `𝙀𝙨𝙘𝙧𝙞𝙗𝙚 𝙚𝙡 𝙀𝙨𝙘𝙧𝙞𝙗𝙚 𝙚𝙡 𝙘𝙖𝙩á𝙡𝙤𝙜𝙤 𝙦𝙪𝙚 𝙙𝙚𝙨𝙚𝙖𝙨 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧, 𝙚𝙟𝙚𝙢𝙥𝙡𝙤 .𝙨𝙚𝙩𝙘𝙖𝙩𝙜 (𝙩𝙚𝙭𝙩𝙤).🥖 `
}


handler.command = ['setcatg'] 
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler