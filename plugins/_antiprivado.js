export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

let setting = global.db.data.settings[this.user.jid]
const settingsREAD = global.db.data.settings[this.user.jid] || {}

if (m.text && prefixRegex.test(m.text)) {
this.sendPresenceUpdate('composing', m.chat)
this.readMessages([m.key])
        
let usedPrefix = m.text.match(prefixRegex)[0]
let command = m.text.slice(usedPrefix.length).trim().split(' ')[0]
}

if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
if (!global.db.data.users[m.sender].mensaje) global.db.data.users[m.sender].mensaje = {};
if (!global.db.data.users[m.sender].mensaje[m.chat]) global.db.data.users[m.sender].mensaje[m.chat] = 0;
global.db.data.users[m.sender].mensaje[m.chat]++;

if (m.fromMe) return
if (m.isGroup) return !1
if (!m.message) return !0 
if (m.chat === "120363297379773397@newsletter") return; 
if (m.chat === "120363355261011910@newsletter") return;
if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') ||  m.text.includes('menu') || m.text.includes('estado') || m.text.includes('code') || m.text.includes('Code') || m.text.includes('bots') || m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('reg') || m.text.includes('verificar') || m.text.includes('Serbot') || m.text.includes('Jadibot') || m.text.includes('jadibot code') || m.text.includes('serbot code') || m.text.includes('jadibot --code') || m.text.includes('serbot --code') || m.text.includes('code')) return !0
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
if (bot.antiPrivate && !isOwner && !isROwner) {
await m.reply(`𝙃𝙊𝙇𝘼, 𝙀𝙎𝙏𝘼 𝙋𝙍𝙊𝙃𝙄𝘽𝙄𝘿𝙊 𝙀𝙎𝘾𝙍𝙄𝘽𝙄𝙍𝙈𝙀 𝘼𝙇 𝙋𝙍𝙄𝙑, 𝙎𝙀𝙍𝘼𝙎 𝘽𝙇𝙊𝙌𝙐𝙀𝘼𝘿𝙊.\n\n> _*𝙋𝘼𝙍𝘼 𝙐𝙎𝘼𝙍 𝙈𝙄𝙎 𝙁𝙐𝙉𝘾𝙄𝙊𝙉𝙀𝙎, 𝙀𝙎𝘾𝙍𝙄𝘽𝙀 𝘼 𝙈𝙄 𝘾𝙍𝙀𝘼𝘿𝙊𝙍: +52 5649707515*_\n${[nnn, nnnttt, nnnt].getRandom()}`, false, { mentions: [m.sender] })
await this.updateBlockStatus(m.chat, 'block')}
return !1
}
