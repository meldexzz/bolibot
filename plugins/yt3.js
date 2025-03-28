import axios from 'axios';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import { pipeline } from 'stream';

const streamPipeline = promisify(pipeline);

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|music\.youtube\.com)\//i.test(text);

  if (!text || !isYoutubeUrl) {
    return m.reply(`✳️ Usa el comando correctamente, mi rey:\n\n📌 Ejemplo: *${usedPrefix}${command}* https://music.youtube.com/watch?v=abc123`);
  }

  await conn.sendMessage(m.chat, {
    react: { text: '⏳', key: m.key }
  });

  try {
    const apiURL = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(text)}&type=audio&quality=128kbps&apikey=russellxz`;
    const res = await axios.get(apiURL);
    const json = res.data;

    if (!json.status || !json.data?.url) {
      console.log('Respuesta de la API:', JSON.stringify(json, null, 2));
      throw new Error("No se pudo obtener el audio");
    }

    const { data, title, fduration, thumbnail } = json;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: `🎧 *Título:* ${title}\n🕒 *Duración:* ${fduration}\n📥 *Tamaño:* ${data.size}\n\n⏳ Descargando audio...`
    }, { quoted: m });

    const tmpDir = path.join('./tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const rawPath = path.join(tmpDir, `${Date.now()}_raw.m4a`);
    const finalPath = path.join(tmpDir, `${Date.now()}_final.mp3`);

    const audioRes = await axios.get(data.url, { responseType: 'stream' });
    await streamPipeline(audioRes.data, fs.createWriteStream(rawPath));

    await new Promise((resolve, reject) => {
      ffmpeg(rawPath)
        .audioCodec('libmp3lame')
        .audioBitrate('128k')
        .save(finalPath)
        .on('end', resolve)
        .on('error', reject);
    });

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(finalPath),
      mimetype: 'audio/mpeg',
      fileName: data.filename || `${title}.mp3`
    }, { quoted: m });

    fs.unlinkSync(rawPath);
    fs.unlinkSync(finalPath);

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

handler.command = ['yt3'];
export default handler;
