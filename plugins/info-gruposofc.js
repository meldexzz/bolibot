let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `✅ 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊 𝘼 𝙇𝙊𝙎 𝙂𝙍𝙐𝙋𝙊𝙎 𝙊𝙁𝙄𝘾𝙄𝘼𝙇𝙀𝙎

*https://whatsapp.com/channel/0029Va8G1nt90x2n0YHWSX3R*
  
*https://chat.whatsapp.com/Kb5X4ZB0Th10eXCu8FocoQ*


➤ ¡𝙑𝙄𝙎𝙄𝙏𝘼 𝙏𝙊𝘿𝙊𝙎 𝙇𝙊𝙎 𝙀𝙉𝙇𝘼𝘾𝙀𝙎, 𝙀𝙉 𝙐𝙉 Ú𝙉𝙄𝘾𝙊 𝙇𝙐𝙂𝘼𝙍!

*https://linktr.ee/ventasbolillobot*



𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 🥖`.trim() 
conn.reply(m.chat, info, m) 
//conn.fakeReply(m.chat, info, '0@s.whatsapp.net', '𝙏𝙝𝙚-𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿', 'status@broadcast')
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^linkgc|grupos|gruposgatabot|gatabotgrupos|gruposdegatabot|groupofc|gruposgb|grupogb|groupgb$/i
handler.register = false 
export default handler
