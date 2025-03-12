import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const handler = async (m, {conn, args, usedPrefix, command}) => {
    let text;
    
    // Verifica si el usuario proporcionó texto
    if (args.length >= 1) {
        text = args.join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        return m.reply("╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝘼𝙂𝙍𝙀𝙂𝙐𝙀́ 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊 𝙋𝘼𝙍𝘼 𝘾𝙍𝙀𝘼𝙍 𝙀𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍");
    }

    // Verifica que el texto no sea vacío
    if (!text) return m.reply("╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝘼𝙂𝙍𝙀𝙂𝙐𝙀́ 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊 𝙋𝘼𝙍𝘼 𝘾𝙍𝙀𝘼𝙍 𝙀𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍");

    // Limita el texto a 45 caracteres
    if (text.length > 45) {
        return m.reply('*⚠️ El texto no puede tener más de 45 caracteres*');
    }

    // Obtener el perfil del usuario o usar una imagen predeterminada
    const pp = await conn.profilePictureUrl(m.sender).catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    const nombre = await conn.getName(m.sender);

    // Crear el objeto para la API con el texto y fondo negro
    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#000000", // Fondo negro
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": `${nombre}`,
                "photo": { "url": pp }
            },
            "text": text,
            "replyMessage": {}
        }]
    };

    // Llamada a la API para generar la imagen
    try {
        const response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        const buffer = Buffer.from(response.data.result.image, 'base64');
        
        // Generar el sticker con la imagen recibida
        let stiker = await sticker(buffer, false, global.packname, global.author);
        
        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true);
        }
    } catch (error) {
        console.error(error);
        return m.reply("Hubo un error al generar el sticker.");
    }
};

handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(qc)$/i;

export default handler;
