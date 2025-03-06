let handler = async (m, { conn, args, groupMetadata}) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
else who = m.chat
if (!who) throw `*¿A quien le doy advertencia?* etiqueta a una persona no soy adivino 🥖 :)`
if (!(who in global.db.data.users)) throw `*⚠️ ¿Quien carajo es ese?* No se encuentra en mi base de datos`
let warn = global.db.data.users[who].warn
if (warn > 0) {
global.db.data.users[who].warn -= 1
m.reply(`*⚠️ SE QUITÓ UNA ADVERTENCIA ⚠️*
         
*• Advertencia:* -1
*• Total:* ${warn - 1}`)
//m.reply(`Un admin redujo su advertencia, ahora tienes *${warn - 1}*`, who)
} else if (warn == 0) {
m.reply('*⚠️ El usuario no tiene ninguna advertencia*')
}}
handler.help = ['delwarn *@user*']
handler.tags = ['group']
handler.command = ['delwarn', 'unwarn'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.register = true 
export default handler
