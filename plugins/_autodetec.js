let WAMessageStubType = (await import(global.baileys)).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';
export async function before(m, { conn, participants, groupMetadata}) {
if (!m.messageStubType || !m.isGroup) return
let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://telegra.ph/file/2a1d71ab744b55b28f1ae.jpg')
let img = await (await fetch(`${pp}`)).buffer()
let usuario = `@${m.sender.split`@`[0]}` 
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let chat = global.db.data.chats[m.chat]
let users = participants.map(u => conn.decodeJid(u.id))
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')

/*if (chat.detect && m.messageStubType == 2) {
const chatId = m.isGroup ? m.chat : m.sender;
const uniqid = chatId.split('@')[0];
const sessionPath = './BotSession/';
const files = await fs.readdir(sessionPath);
let filesDeleted = 0;
for (const file of files) {
if (file.includes(uniqid)) {
await fs.unlink(path.join(sessionPath, file));
filesDeleted++;
console.log(`⚠️ Eliminacion session (PreKey) que provocan el undefined el chat`)}}*/

if (chat.detect && m.messageStubType == 21) {
await this.sendMessage(m.chat, { text: `${usuario} \`𝙃𝘼𝙎 𝘾𝘼𝙈𝘽𝙄𝘼𝘿𝙊 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀́ 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 𝘼:\`\n\n> *${m.messageStubParameters[0]}*`, mentions: [m.sender], mentions: [...groupAdmins.map(v => v.id)] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
} else if (chat.detect && m.messageStubType == 22) {
await this.sendMessage(m.chat, { text: `${usuario} \`𝙃𝘼𝙎 𝘾𝘼𝙈𝘽𝙄𝘼𝘿𝙊 𝙇𝘼𝙎 𝙁𝙊𝙏𝙊 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊\``, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
} else if (chat.detect && m.messageStubType == 24) {
await this.sendMessage(m.chat, { text: `${usuario} 𝙉𝙐𝙀𝙑𝘼 𝘿𝙀𝙎𝘾𝙍𝙄𝙋𝘾𝙄𝙊𝙉 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 𝙀𝙎:\n\n${m.messageStubParameters[0]}`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType == 25) {
await this.sendMessage(m.chat, { text: `🔒 𝘼𝙃𝙊𝙍𝘼 *${m.messageStubParameters[0] == 'on' ? '𝙎𝙊𝙇𝙊 𝘼𝘿𝙈𝙄𝙉𝙎' : '𝙏𝙊𝘿𝙊𝙎'}* 𝙋𝙐𝙀𝘿𝙀 𝙀𝘿𝙄𝙏𝘼𝙍 𝙇𝘼 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊𝙉 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType == 26) {
await this.sendMessage(m.chat, { text: `𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 *${m.messageStubParameters[0] == 'on' ? '𝙀𝙎𝙏𝘼 𝘾𝙀𝙍𝙍𝘼𝘿𝙊 🔒' : '𝙀𝙎𝙏𝘼 𝘼𝘽𝙄𝙀𝙍𝙏𝙊 🔓'}*\n ${m.messageStubParameters[0] == 'on' ? '𝙎𝙊𝙇𝙊 𝙇𝙊𝙎 𝘼𝘿𝙈𝙄𝙉𝙎 𝙋𝙐𝙀𝘿𝙀𝙉 𝙀𝙎𝘾𝙍𝙄𝘽𝙄𝙍 🥖' : '𝙔𝘼 𝙋𝙐𝙀𝘿𝙀𝙉 𝙀𝙎𝘾𝙍𝙄𝘽𝙄𝙍 𝙏𝙊𝘿𝙊𝙎 🥖'} 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.welcome && m.messageStubType == 27 && this.user.jid != global.conn.user.jid) { 
let subject = groupMetadata.subject
let descs = groupMetadata.desc || "¡𝙐𝙉 𝙂𝙍𝙐𝙋𝙊 𝙂𝙀𝙉𝙄𝘼𝙇!\n 𝙎𝙄𝙉 𝙍𝙀𝙂𝙇𝘼𝙎...🥖";
let userName = `${m.messageStubParameters[0].split`@`[0]}`;
let defaultWelcome = `┏━━━━━━━━━━━━\n┃¡𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊!\n┃━━━━━━━━━━━━\n┃ 𝙃𝙊𝙇𝘼 @${userName} 👋 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊 𝘼*\n┃ *_${subject} ✨_*\n┃\n┃ 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊 𝙋𝙊𝘿𝙍Á𝙎\n┃ 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝘼𝙍\n┠ 𝘼𝙈𝙄𝙎𝙏𝘼𝘿𝙀𝙎 \n┠ 𝙐𝙉 𝘽𝙊𝙏 𝙎𝙀𝙓𝙔\n┃\n┃ 𝙋𝙐𝙀𝘿𝙀𝙎 𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝘼𝙍 𝙈𝙄 𝙇𝙄𝙎𝙏𝘼 𝘿𝙀\n┃ 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎 𝘾𝙊𝙉:\n┠ .𝙢𝙚𝙣𝙪\n┃\n┃ 𝘼𝙌𝙐Í 𝙏𝙄𝙀𝙉𝙀𝙎 𝙇𝘼 𝘿𝙀𝙎𝘾𝙍𝙄𝙋𝘾𝙄Ó𝙉\n┃ 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊, 𝙇É𝙀𝙇𝘼\n┃\n\n${descs}\n\n┃\n┃ 𝘿𝙄𝙎𝙁𝙍𝙐𝙏𝘼 𝘿𝙀𝙇 𝙈𝙐𝙉𝘿𝙊\n┃ 𝘿𝙀 𝙇𝙊𝙎 𝘽𝙊𝙇𝙄𝙇𝙇𝙊𝙎.🥖\n┃\n┗━━━━━━━━━━━`;
let textWel = chat.sWelcome ? chat.sWelcome
.replace(/@user/g, `@${userName}`)
.replace(/@group/g, subject) 
.replace(/@desc/g, descs)
: defaultWelcome;
        
await this.sendMessage(m.chat, { text: textWel, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender, m.messageStubParameters[0]],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: pp, 
title: "BIENVENID@ 😄",
body: [wm, ' ' + wm + '😊', '🌟'].getRandom(),
containsAutoReply: true,
mediaType: 1, 
sourceUrl: [nna, nna2, yt].getRandom()}}}, { quoted: fkontak }) 
} else if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32) && this.user.jid != global.conn.user.jid ) {
let subject = groupMetadata.subject;
let userName = `${m.messageStubParameters[0].split`@`[0]}`;
let defaultBye = `┏━━━━━━━━━━━━\n┃𝘼𝘿𝙄Ó𝙎\n┃━━━━━━━━━━━━\n┃ *_☠ Se fue @${userName}_* \n┃ 𝙋Ó𝙉𝙂𝘼𝙉𝙇𝙀 𝙑𝙀𝙍𝙂𝘼 𝙀𝙉 𝙇𝘼 𝘽𝙊𝘾𝘼 \n┃ 𝙋𝙊𝙍 𝙉𝙊 𝘾𝙊𝙈𝙀𝙍 𝘽𝙊𝙇𝙄𝙇𝙇𝙊. 🥖\n┗━━━━━━━━━━`;
let textBye = chat.sBye ? chat.sBye
.replace(/@user/g, `@${userName}`)
.replace(/@group/g, subject)
: defaultBye;
await this.sendMessage(m.chat, { text: textBye, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender, m.messageStubParameters[0]],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: pp, 
title: "BYE 👋",
body: [wm, ' ' + wm + '😊', '🌟'].getRandom(),
containsAutoReply: true,
mediaType: 1, 
sourceUrl: [nna, nna2, nnaa, yt, md].getRandom()}}}, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 29) {
await this.sendMessage(m.chat, { text: `@${m.messageStubParameters[0].split`@`[0]} 𝘼𝙃𝙊𝙍𝘼 𝙀𝙎 𝘼𝘿𝙈𝙄𝙉 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n😼🫵𝘼𝘾𝘾𝙄𝙊𝙉 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝘿𝘼 𝙋𝙊𝙍: ${usuario}`, mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType == 30) {
await this.sendMessage(m.chat, { text: `@${m.messageStubParameters[0].split`@`[0]} 𝘿𝙀𝙅𝘼 𝘿𝙀 𝙎𝙀𝙍 𝘼𝘿𝙈𝙄𝙉 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n😼🫵𝘼𝘾𝘾𝙄𝙊𝙉 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝘿𝘼 𝙋𝙊𝙍: ${usuario}`, mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType === 172 && m.messageStubParameters.length > 0) {
const rawUser = m.messageStubParameters[0];
const users = rawUser.split('@')[0]; 
const prefijosProhibidos = ['91', '92', '222', '93', '265', '61', '62', '966', '229', '40', '49', '20', '963', '967', '234', '210', '212'];
const usersConPrefijo = users.startsWith('+') ? users : `+${users}`;

if (chat.antifake) {
if (prefijosProhibidos.some(prefijo => usersConPrefijo.startsWith(prefijo))) {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'reject');
console.log(`Solicitud de ingreso de ${usersConPrefijo} rechazada automáticamente por tener un prefijo prohibido.`);
} catch (error) {
console.error(`Error al rechazar la solicitud de ${usersConPrefijo}:`, error);
}} else {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
console.log(`Solicitud de ingreso de ${usersConPrefijo} aprobada automáticamente.`);
} catch (error) {
console.error(`Error al aprobar la solicitud de ${usersConPrefijo}:`, error);
}}} else {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
console.log(`Solicitud de ingreso de ${usersConPrefijo} aprobada automáticamente ya que #antifake está desactivado.`);
} catch (error) {
console.error(`Error al aprobar la solicitud de ${usersConPrefijo}:`, error);
}}
return;
} if (chat.detect && m.messageStubType == 72) {
await this.sendMessage(m.chat, { text: `${usuario} 𝘾𝘼𝙈𝘽𝙄𝙊 𝙇𝘼𝙎 𝘿𝙐𝙍𝘼𝘾𝙄𝙊𝙉 𝘿𝙀𝙇 𝙇𝙊𝙎 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝙏𝙀𝙈𝙋𝙊𝙍𝘼𝙇𝙀𝙎 𝘼 *@${m.messageStubParameters[0]}*`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType == 123) {
await this.sendMessage(m.chat, { text: `${usuario} *𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝙊́* 𝙇𝙊𝙎 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝙏𝙀𝙈𝙋𝙊𝙍𝘼𝙇.`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else {
console.log({messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType], 
})}}
