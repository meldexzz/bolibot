// by https://github.com/elrebelde21 & https://github.com/GataNina-Li
import { randomBytes } from 'crypto'

let handler = async (m, { conn, command, participants, usedPrefix, text }) => { 
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${conn.user.jid.split('@')[0]}:${conn.user.jid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" } 

if (!text && !m.quoted) return m.reply('*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐞 𝐭𝐫𝐚𝐦𝐢𝐭𝐞 🥖*')   
let cc4 = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks4 = text ? text : cc4.text 
let groups2 = Object.keys(await conn.groupFetchAllParticipating())
let chats2 = Object.keys(global.db.data.users).filter(user => user.endsWith('@s.whatsapp.net'))
await conn.reply(m.chat, '*Enviando mensaje oficial, espere un momento...*', m);
let start2 = new Date().getTime()
let usersTag2 = participants.map(u => conn.decodeJid(u.id))
let totalPri2 = 0
for (let i = 0; i < groups2.length; i++) {
const group = groups2[i];
const delay = i * 4000; // 4 seg
setTimeout(async () => {
await conn.reply(group, `✅ *COMUNICADO OFICIAL* ✅\n\n` + teks4, { mentions: usersTag2 }, { quoted: fkontak });
}, delay)}
for (let user of chats2) {
await new Promise(resolve => setTimeout(resolve, 2000)) // 2 segundos
await delay(2 * 2000)
await conn.reply(user, `✅ *COMUNICADO OFICIAL* ✅\n\n` + teks4, fkontak, null)
totalPri2++
if (totalPri2 >= 500000) { 
break
}}  
let end2 = new Date().getTime()
let totalPrivate2 = chats2.length
let totalGroups2 = groups2.length
let total2 = totalPrivate2 + totalGroups2
let time2 = Math.floor((end2 - start2) / 1000)
if (time2 >= 60) {
let minutes = Math.floor(time2 / 60)
let seconds = time2 % 60
time2 = `${minutes} minutos y ${seconds} segundos`
} else {
time2 = `${time2} segundos`
} 
await m.reply(`✅ ᴍᴇɴsᴀᴊᴇ ᴇɴᴠɪᴀᴅᴏ ᴀ:
\`\`\`ᴄʜᴀᴛ ᴘʀɪᴠᴀᴅᴏ >> ${totalPrivate2}\`\`\`
\`\`\`ᴄʜᴀᴛ ɢʀᴜᴘᴏs >>   ${totalGroups2}\`\`\`
\`\`\`ᴄʜᴀᴛs ᴛᴏᴛᴀʟᴇs  >>   ${total2}\`\`\`\n\n*• ᴛɪᴇᴍᴘᴏ ᴛᴏᴛᴀʟ ᴅᴇ ᴇɴᴠɪᴏ:* ${time2}\n${totalPri2 >= 500000 ? `\n*𝐍𝐎𝐓𝐀: 𝐄𝐬 𝐩𝐨𝐬𝐢𝐛𝐥𝐞 𝐪𝐮𝐞 𝐭𝐞𝐧𝐠𝐚 𝐟𝐚𝐥𝐥𝐨𝐬 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐲 𝐧𝐨 𝐬𝐞 𝐞𝐧𝐯𝐢𝐞 𝐚 𝐭𝐨𝐝𝐨𝐬 𝐥𝐨𝐬 𝐜𝐡𝐚𝐭𝐬, 𝐝𝐢𝐬𝐜𝐮𝐥𝐩𝐞 𝐩𝐨𝐫 𝐞𝐥 𝐦𝐨𝐦𝐞𝐧𝐭𝐨*` : ''}`);        
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(comunicar|comunicado|broadcastall|bc)$/i
handler.owner = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)