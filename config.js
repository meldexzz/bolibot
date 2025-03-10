import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//---------[ Añada los numeros a ser Propietario/a ]---------

global.owner = [['5215649707515', 'ＰＲＯＰＩＥＴＡＲＩＯ', true]]
global.mods = []
global.prems = []

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = "" //Ejemplo: +59309090909
global.confirmCode = "" 

//cambia a false Desactivar en "auto-reconexion" de sub-bots
global.gataJadibts = true 

// Cambiar a false para usar el Bot desde el mismo numero del Bot.
global.isBaileysFail = false

//---------[ APIS GLOBAL ]---------

global.baileys = '@whiskeysockets/baileys'
global.apis = 'https://delirius-apiofc.vercel.app'

global.APIs = { lolhuman: { url: 'https://api.lolhuman.xyz/api/', key: 'GataDiosV3' },
skizo: { url: 'https://skizo.tech/api/', key: 'GataDios' },
alyachan: { url: 'https://api.alyachan.dev/api/', key: null }, 
neoxr: { url: 'https://api.neoxr.eu/api', key: 'GataDios' },
fgmods: { url: 'https://api.fgmods.xyz/api', key: 'elrebelde21' },
popcat: { url: 'https://api.popcat.xyz', key: null }}

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	

//------------------------[ Stickers ]-----------------------------

global.packname = '𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 🥖'
global.author = '𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕'

//------------[ Versión | Nombre | cuentas ]------------

global.wm = '𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 🥖' 
global.botname = '𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 🥖'
global.vs = '1.0.0'
global.yt = ''
global.tiktok = ''
global.md = ''
global.fb = ''
global.face = ''

global.nna = 'https://chat.whatsapp.com/Kb5X4ZB0Th10eXCu8FocoQ' //Update
global.nna2 = 'https://chat.whatsapp.com/Kb5X4ZB0Th10eXCu8FocoQ' //LoliBot update
global.nnaa = 'https://chat.whatsapp.com/Kb5X4ZB0Th10eXCu8FocoQ' //LoliBot - Test
global.nn = 'https://whatsapp.com/channel/0029Va8G1nt90x2n0YHWSX3R' //Grupo 1
global.nnn = 'https://whatsapp.com/channel/0029Va8G1nt90x2n0YHWSX3R' //Grupo 2
global.nnnt = 'https://whatsapp.com/channel/0029Va8G1nt90x2n0YHWSX3R' //Grupo del Colaboracion
global.nnnt2 = 'https://whatsapp.com/channel/0029Va8G1nt90x2n0YHWSX3R' // Grupo COL 2
global.nnntt = 'https://whatsapp.com/channel/0029Va8G1nt90x2n0YHWSX3R' //Grupo COL 3
global.nnnttt = 'https://chat.whatsapp.com/Kb5X4ZB0Th10eXCu8FocoQ' //enlace lolibot
global.nnntttt = 'https://whatsapp.com/channel/0029Va8G1nt90x2n0YHWSX3R' //Grupo ayuda sobre el bot
global.bot = ''
global.asistencia = ``
global.redes = [nna, nna2, yt, nn, nnn, nnnt, nnnttt, md, tiktok, fb, nnn, face]

//------------------------[ Info | Datos ]---------------------------

global.wait = 'Calmao pa estoy procesando😎\n\n> *❗Por favor no hacer spam👏❗*'
global.waitt = '*⌛ _Cargando..._ ▬▬▭▭▭*'
global.waittt = '*⌛ _Cargando..._ ▬▬▬▬▭▭*'
global.waitttt = '*⌛ _Cargando..._ ▬▬▬▬▬▬▭*'
global.waittttt = '*⌛ _Cargando..._ ▬▬▬▬▬▬▬*'
global.rg = '『✅ 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 ✅』\n\n'
global.resultado = rg
global.ag = '『⚠️ 𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 ⚠️』\n\n'
global.advertencia = ag
global.iig = '『❕ 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊𝙉 』\n\n'
global.informacion = iig
global.fg = '『❌ 𝙀𝙍𝙍𝙊𝙍 ❌』\n\n'
global.fallo = fg
global.mg = '『❗️ 𝙇𝙊 𝙐𝙎𝙊 𝙈𝘼𝙇❗』\n\n'
global.mal = mg
global.eeg = '『📩 𝙍𝙀𝙋𝙊𝙍𝙏𝙀 📩』\n\n'
global.envio = eeg
global.eg = '『💚 𝙀𝙓𝙄𝙏𝙊𝙎 💚』\n\n'
global.exito = eg

//-------------------------[ IMAGEN ]------------------------------
//global.img = "https://qu.ax/Zgqq.jpg"
global.img1 = ''
global.img2 = ''

global.imagen = fs.readFileSync('./Menu2.jpg')
global.imagen1 = fs.readFileSync('./media/Menu1.jpg')
global.imagen2 = fs.readFileSync('./media/Menu2.jpg')
global.imagen3 = fs.readFileSync('./media/Menu3.jpg')
global.imagen4 = fs.readFileSync('./media/Menu4.jpg')
global.imagen5 = ''
global.imagen6 = ''
global.menu18 = ''
global.vid1 = ''
global.img = [imagen, imagen1, imagen2, imagen3, imagen4]
global.imageUrl = ["", "", ""]

//----------------------------[ NIVELES | RPG ]---------------------------------

global.multiplier = 850 // Cuanto más alto, más difícil subir de nivel
global.maxwarn = '4' // máxima advertencias

//━━━━━━━━━━━━━━━━━━━━ ฅ^•ﻌ•^ฅ

global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

//---------------[ IDs de canales ]----------------

global.ch = {
ch1: '120363190400869019@newsletter', 
ch2: '120363190400869019@newsletter', 
ch3: '120363190400869019@newsletter',
ch4: '120363190400869019@newsletter',
ch5: '120363190400869019@newsletter', 
}

//----------------------------------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
