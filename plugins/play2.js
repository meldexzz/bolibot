import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`✳️ Usa el comando correctamente:\n\n📌 Ejemplo: *${usedPrefix}${command}* La Factoría - Perdóname`);
  }

  await conn.sendMessage(m.chat, {
    react: { text: '⏳', key: m.key }
  });

  try {
    const searchUrl = `https://api.neoxr.eu/api/video?q=${encodeURIComponent(text)}&apikey=russellxz`;
    const searchRes = await axios.get(searchUrl);
    const videoInfo = searchRes.data;
    if (!videoInfo || !videoInfo.data?.url) throw new Error('No se pudo encontrar el video');

    const title = videoInfo.title || 'video';
    const thumbnail = videoInfo.thumbnail;
    const duration = videoInfo.fduration || '0:00';
    const views = videoInfo.views || 'N/A';
    const author = videoInfo.channel || 'Desconocido';
    const videoLink = `https://www.youtube.com/watch?v=${videoInfo.id}`;

    const captionPreview = `
╔═════════════╗
║✦ 𝗕𝗢𝗟𝗜𝗕𝗢𝗧 ✦
╚═════════════╝

📀 *𝗜𝗻𝗳𝗼 𝗱𝗲𝗹 𝘃𝗶𝗱𝗲𝗼:*  
╭───────────────╮  
├ 🎼 *Título:* ${title}
├ ⏱️ *Duración:* ${duration}
├ 👁️ *Vistas:* ${views}
├ 👤 *Autor:* ${author}
└ 🔗 *Link:* ${videoLink}
╰───────────────╯

📥 *Opciones de Descarga:*  
┣ 🎵 *Audio:* _${usedPrefix}play1 ${text}_
┣ 🎵 *Audio:* _${usedPrefix}play5 ${text}_
┣ 🎥 *Video:* _${usedPrefix}play2 ${text}_
┣ 🎥 *Video:* _${usedPrefix}play6 ${text}_
┗ ⚠️ *¿No se reproduce?* Usa _${usedPrefix}ff_

⏳ *Procesado por Bolibot*
═════════════════════  
        𖥔 Bolibot 𖥔
═════════════════════`;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: captionPreview
    }, { quoted: m });

    const qualities = ['720p', '480p', '360p'];
    let videoData = null;
    for (let quality of qualities) {
      try {
        const apiUrl = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(videoLink)}&apikey=russellxz&type=video&quality=${quality}`;
        const response = await axios.get(apiUrl);
        if (response.data?.status && response.data?.data?.url) {
          videoData = {
            url: response.data.data.url,
            title: response.data.title || title,
            thumbnail: response.data.thumbnail || thumbnail,
            duration: response.data.fduration || duration,
            views: response.data.views || views,
            channel: response.data.channel || author,
            quality: response.data.data.quality || quality,
            size: response.data.data.size || 'Desconocido',
            publish: response.data.publish || 'Desconocido',
            id: response.data.id || videoInfo.id
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
    const filename = `${Date.now()}_video.mp4`;
    const filePath = path.join(tmpDir, filename);

    const resDownload = await axios.get(videoData.url, {
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    await streamPipeline(resDownload.data, fs.createWriteStream(filePath));

    const stats = fs.statSync(filePath);
    if (!stats || stats.size < 100000) {
      fs.unlinkSync(filePath);
      throw new Error('El video descargado está vacío o incompleto');
    }

    const finalText = `🎬 Aquí tiene su video.\n\nDisfrútelo y continúe explorando el mundo digital.\n\n© Bolibot`;

    await conn.sendMessage(m.chat, {
      video: fs.readFileSync(filePath),
      mimetype: 'video/mp4',
      fileName: `${videoData.title}.mp4`,
      caption: finalText,
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

handler.command = ['play2'];
export default handler;
