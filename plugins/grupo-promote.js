const handler = async (m, {conn, usedPrefix, text}) => {
if (isNaN(text) && !text.match(/@/g)) {
} else if (isNaN(text)) {
var number = text.split`@`[1];
} else if (!isNaN(text)) {
var number = text;
}

if (!text && !m.quoted) return conn.reply(m.chat, `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙍𝙀𝘾𝙄𝘽𝙄𝙍Á 𝘼𝘿𝙈𝙄𝙉.🥖`, m);
if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `*⚠️ Estas drogado ese número ingresado es incorrecto 🤓*, ingresa un número correcto o mejor etiquetas al usuario @tag`, m);
try {
if (text) {
var user = number + '@s.whatsapp.net';
} else if (m.quoted.sender) {
var user = m.quoted.sender;
} else if (m.mentionedJid) {
var user = number + '@s.whatsapp.net';
}} catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'promote');
conn.reply(m.chat, `*[ ✅ ] ÓRDENES RECIBIDAS*`, m);
}};
handler.help = ['*593xxx*', '*@usuario*', '*responder chat*'].map((v) => 'promote ' + v);
handler.tags = ['group'];
handler.command = /^(promote|daradmin|darpoder)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;
handler.register = false 
export default handler;
