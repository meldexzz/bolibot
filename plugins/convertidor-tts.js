import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

const defaultLang = 'es'
let handler = async (m, { conn, args, usedPrefix, command }) => {

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted?.text) text = m.quoted.text

    let res
    try {
        res = await tts(text, lang)
    } catch (e) {
        m.reply(e + '')
        text = args.join(' ')
        if (!text) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsconvert15}\n*${usedPrefix + command} es GataBot*`
        await conn.sendPresenceUpdate('recording', m.chat)
        res = await tts(text, defaultLang)
    } finally {
        if (res) conn.sendFile(m.chat, res, 'tts.opus', null, m, true)
    }
}

handler.help = ['tts <lang> <text>']
handler.tags = ['tools']
handler.command = /^g?tts|totts$/i

export default handler

// Función que convierte el texto a voz
function tts(text, lang = 'es') {
    console.log(lang, text)
    return new Promise((resolve, reject) => {
        try {
            // Crear un objeto tts para el idioma elegido
            let tts = gtts(lang)
            let filePath = join(__dirname, '../tmp', (1 * new Date) + '.mp3') // Guardar como mp3
            console.log('Generando archivo en: ', filePath)  // Depurar ruta

            // Guardar el archivo de audio
            tts.save(filePath, text, () => {
                console.log('Archivo de audio generado correctamente.')  // Depuración
                resolve(readFileSync(filePath))  // Leer el archivo generado
                unlinkSync(filePath)  // Eliminar el archivo temporal después de enviarlo
            })
        } catch (e) {
            console.error('Error en la generación del archivo TTS:', e)
            reject(e)
        }
    })
}
