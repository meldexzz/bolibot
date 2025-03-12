import { sticker } from '../lib/sticker.js';
import { createCanvas, loadImage } from 'canvas';  // Importamos Canvas
import { MessageType } from '@adiwajshing/baileys'; // Asegúrate de que sea compatible con tu librería

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

    // Crea un lienzo para generar la imagen con canvas
    const canvas = createCanvas(512, 512); // Tamaño de la imagen
    const ctx = canvas.getContext('2d');

    // Fondo negro
    ctx.fillStyle = '#000000'; // Establece el fondo negro
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texto blanco
    ctx.fillStyle = '#FFFFFF'; // Establece el color del texto a blanco
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Ajusta el texto para que se dibuje dentro de la imagen
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convierte el lienzo a un buffer en formato PNG
    const buffer = canvas.toBuffer('image/png');

    // Crea el sticker con el buffer generado
    let stiker = await sticker(buffer, false, global.packname, global.author);

    // Envía el sticker al chat
    if (stiker) {
        return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true);
    } else {
        return m.reply("Hubo un error al generar el sticker.");
    }
};

handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(qc)$/i;

export default handler;
