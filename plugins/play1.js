import axios from 'axios';
import yts from 'yt-search';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`✳️ Usa el comando correctamente:\n\n📌 Ejemplo: *${usedPrefix}${command}* bad bunny diles`);
  }

  await conn.sendMessage(m.chat, {
    react: { text: '⏳', key: m.key }
  });

  try {
    const search = await yts(text);
    const video = search.videos[0];
    if (!video) throw new Error('No se encontraron resultados');

    const videoUrl = video.url;
    const thumbnail = video.thumbnail;
    const title = video.title;
    const fduration = video.timestamp;
    const views = video.views.toLocaleString();
    const channel = video.author.name || 'Desconocido';

    const infoMessage = `
╔════════════╗
║  ✦ Boli bot ✦
╚════════════╝

📀 *𝙄𝙣𝙛𝙤 𝙙𝙚𝙡 𝙖𝙪𝙙𝙞𝙤:*  
╭───────────────╮  
├ 🎼 *Título:* ${title}
├ ⏱️ *Duración:* ${fduration}
├ 👁️ *Vistas:* ${views}
├ 👤 *Autor:* ${channel}
└ 🔗 *Enlace:* ${videoUrl}
╰───────────────╯

📥 *Opciones de Descarga:*  
┣ 🎵 *Audio:* _${usedPrefix}play1 ${text}_
┣ 🎵 *Audio:* _${usedPrefix}play5 ${text}_
┣ 🎥 *Video:* _${usedPrefix}play2 ${text}_
┗ 🎥 *Video:* _${usedPrefix}play6 ${text}_

⏳ *Espera un momento...*  
⚙️ *boli bot está procesando tu música...*
═══════════════════  
     𖥔 boli bot Bot 𖥔`;

    await conn.sendFile(m.chat, thumbnail, 'imagen.jpg', infoMessage, m);

    const apiURL = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(videoUrl)}&type=audio&quality=128kbps&apikey=russellxz`;
    const res = await axios.get(apiURL);
    const json = res.data;

    if (!json.status || !json.data?.url) throw new Error("No se pudo obtener el audio");

    const tmpDir = path.join('./tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const rawPath = path.join(tmpDir, `${Date.now()}_raw.m4a`);
    const finalPath = path.join(tmpDir, `${Date.now()}_final.mp3`);

    const audioRes = await axios.get(json.data.url, { responseType: 'stream' });
    await streamPipeline(audioRes.data, fs.createWriteStream(rawPath));

    await new Promise((resolve, reject) => {
      ffmpeg(rawPath)
        .audioCodec('libmp3lame')
        .audioBitrate('128k')
        .format('mp3')
        .save(finalPath)
        .on('end', resolve)
        .on('error', reject);
    });

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(finalPath),
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: m });

    fs.unlinkSync(rawPath);
    fs.unlinkSync(finalPath);

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(m.chat, { text: `❌ *Error:* ${err.message}` }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.command = ['play1'];
export default handler;
