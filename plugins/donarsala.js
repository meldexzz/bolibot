let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
m.reply(`${toM(a)}, 𝘿𝙊𝙉𝘼 𝙎𝘼𝙇𝘼, 𝙋𝙊𝘽𝙍𝙀.\n
𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 🥖`, null, {
mentions: [a, b]
})}
handler.help = ['donarsala']
handler.tags = ['freefire']
handler.command = ['donarsala', 'sala']
handler.group = true 
export default handler