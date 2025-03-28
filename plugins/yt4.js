import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || (!text.includes('youtube.com') && !text.includes('youtu.be'))) {
    return m.reply(`✳️ Usa el comando correctamente:\n\n📌 Ejemplo: *${usedPrefix}${command}* https://youtube.com/watch?v=...`);
  }

  await conn.sendMessage(m.chat, {
    react: { text: '⏳', key: m.key }
  });

  try {
    const qualities = ['720p', '480p', '360p'];
    let videoData = null;

    for (let quality of qualities) {
      try {
        const apiUrl = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(text)}&type=video&quality=${quality}&apikey=russellxz`;
        const response = await axios.get(apiUrl);
        if (response.data?.status && response.data?.data?.url) {
          videoData = {
            url: response.data.data.url,
            title: response.data.title || 'video',
            thumbnail: response.data.thumbnail,
            duration: response.data.fduration,
            views: response.data.views,
            channel: response.data.channel,
            quality: response.data.data.quality || quality,
            size: response.data.data.size || 'Desconocido',
            publish: response.data.publish || 'Desconocido',
            id: response.data.id || ''
          };
          break;
        }
      } catch {
        continue;
      }
    }

    if (!videoData) throw new Error('No se pudo obtener el video en ninguna calidad');

    const tmpDir = path.join('./tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const filePath = path.join(tmpDir, `${Date.now()}_video.mp4`);

    const response = await axios.get(videoData.url, {
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    await streamPipeline(response.data, fs.createWriteStream(filePath));

    const stats = fs.statSync(filePath);
    if (!stats || stats.size < 100000) {
      fs.unlinkSync(filePath);
      throw new Error('El video descargado está vacío o incompleto');
    }

    const caption = `
╔═════════════╗
║✦ 𝗕𝗢𝗟𝗜𝗕𝗢𝗧 ✦
╚═════════════╝

📀 *𝗜𝗻𝗳𝗼 𝗱𝗲𝗹 𝘃𝗶𝗱𝗲𝗼:*  
╭───────────────╮  
├ 🎼 *Título:* ${videoData.title}
├ ⏱️ *Duración:* ${videoData.duration}
├ 👁️ *Vistas:* ${videoData.views}
├ 👤 *Canal:* ${videoData.channel}
├ 🗓️ *Publicado:* ${videoData.publish}
├ 📦 *Tamaño:* ${videoData.size}
├ 📹 *Calidad:* ${videoData.quality}
└ 🔗 *Link:* https://youtu.be/${videoData.id}
╰───────────────╯
┗ ⚠️ *¿No se reproduce?* Usa _${usedPrefix}ff_

⏳ *Procesado por Bolibot*`;

    await conn.sendMessage(m.chat, {
      video: fs.readFileSync(filePath),
      mimetype: 'video/mp4',
      fileName: `${videoData.title}.mp4`,
      caption,
      gifPlayback: false
    }, { quoted: m });

    fs.unlinkSync(filePath);

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(m.chat, {
      text: `❌ *Error:* ${err.message}`
    }, { quoted: m });
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    });
  }
};

handler.command = ['yt4'];
export default handler;
