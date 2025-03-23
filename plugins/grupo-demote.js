const handler = async (m, {conn, usedPrefix, text}) => {
if (isNaN(text) && !text.match(/@/g)) {
} else if (isNaN(text)) {
var number = text.split`@`[1];
} else if (!isNaN(text)) {
var number = text;
}

if (!text && !m.quoted) return conn.reply(m.chat, `𝘌𝘵𝘪𝘲𝘶𝘦𝘵𝘢 𝘢 𝘲𝘶𝘪𝘦𝘯 𝘥𝘦𝘴𝘦𝘢𝘴 𝘲𝘶𝘪𝘵𝘢𝘳𝘭𝘦 𝘢𝘥𝘮𝘪𝘯.🥖`, m);
if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `𝘌𝘵𝘪𝘲𝘶𝘦𝘵𝘢 𝘰 𝘦𝘴𝘤𝘳𝘪𝘣𝘦 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦 𝘦𝘭 𝘯𝘶𝘮𝘦𝘳𝘰.🥖`, m);
try {
if (text) {
var user = number + '@s.whatsapp.net';
} else if (m.quoted.sender) {
var user = m.quoted.sender;
} else if (m.mentionedJid) {
var user = number + '@s.whatsapp.net';
}} catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'demote');
conn.reply(m.chat, `𝘖𝘳𝘥𝘦𝘯𝘦𝘴 𝘳𝘦𝘤𝘪𝘣𝘪𝘥𝘢𝘴.🥖`, m);
}};
handler.help = ['*593xxx*', '*@usuario*', '*responder chat*'].map((v) => 'demote ' + v);
handler.tags = ['group'];
handler.command = /^(demote|quitarpoder|quitaradmin)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.register = false 
handler.fail = null;
export default handler;
