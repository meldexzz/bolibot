import { WAMessageStubType } from '@whiskeysockets/baileys'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'


async function getUserName(conn, jid) {
  let name = await conn.getName(jid)
  if (!name) {
    const contact = await conn.fetchContact(jid)
    name = contact?.notify || contact?.name || jid.split('@')[0]
  }
  return name
}

function getGroupIcon(m) {
  const dirPath = path.resolve('./groupIcons')
  const groupIconPath = path.join(dirPath, `${m.chat}.jpg`)

  if (fs.existsSync(groupIconPath)) {
    return fs.readFileSync(groupIconPath)
  }
  return null
}

async function getUserProfilePicture(conn, jid) {
  try {
    const ppUrl = await conn.profilePictureUrl(jid, 'image')
    if (ppUrl) {
      return await (await fetch(ppUrl)).buffer()
    }
  } catch (e) {
    
  }
  return null
}



export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]

  
  const userJid = m.messageStubParameters[0]
  let img = await getUserProfilePicture(conn, userJid)

  
  if (!img) {
    img = getGroupIcon(m)
  }

  if (!img) {
    img = imagen1
  }

  //const userName = await getUserName(conn, userJid)

  if (chat.welcome) {
    let message = ''
    if (m.messageStubType == 27) {
      message = chat.sWelcome
        ? chat.sWelcome.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `👋 ¡𝙃𝙊𝙇𝘼 _*${taguser} 𝙉𝙊𝙎 𝘼𝙇𝙀𝙂𝙍𝘼 𝙏𝙀𝙉𝙀𝙍𝙏𝙀 𝘼𝙌𝙐𝙄!.\n 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊 𝘼 ${groupMetadata.subject}*_ \n\n𝘽𝙊𝙇𝙄𝙇𝙇𝙊𝘽𝙊𝙏 🥖
✅ 𝐃𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞 𝟐𝟒/𝟕 𝐬𝐢𝐧 𝐜𝐚í𝐝𝐚𝐬\n✅ 𝐌á𝐬 𝐝𝐞 +𝟓𝟎𝟎 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐚𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐝𝐨𝐬.\n✅ 𝐏𝐫𝐮𝐞𝐛𝐚 𝐠𝐫𝐚𝐭𝐮𝐢𝐭𝐚 𝐩𝐚𝐫𝐚 𝐜𝐨𝐧𝐨𝐜𝐞𝐫 𝐬𝐮𝐬 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐞𝐬.\n📌 𝙋𝙖𝙧𝙖 𝙚𝙢𝙥𝙚𝙯𝙖𝙧, 𝙚𝙨𝙘𝙧𝙞𝙗𝙚: .menu\n
📩 𝘚𝘪 𝘥𝘦𝘴𝘦𝘢𝘴 𝘢𝘥𝘲𝘶𝘪𝘳𝘪𝘳 𝘦𝘴𝘵𝘦 𝘣𝘰𝘵, 𝘦𝘴𝘤𝘳í𝘣𝘦𝘭𝘦 𝘢: +52 5649707515 🚀
        
        `
          
          
          ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        
          : `_👋 *${taguser}* Ha abandonado el grupo_`
    } else if (m.messageStubType == 28) {
      message = chat.sBye
        ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_☠️ *${taguser}* Fue expulsad@ del grupo_`
    }

    if (message) {
      await conn.sendMessage(m.chat, { image: img, caption: message, mentions: [userJid] })
    }
  }
  }
    
