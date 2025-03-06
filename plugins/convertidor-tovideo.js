import {webp2mp4} from '../lib/webp2mp4.js';
import {ffmpeg} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
if (!m.quoted) throw `*⚠️ 𝐑𝐄𝐒𝐏𝐎𝐍𝐃𝐄 𝐀 𝐔𝐍 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 𝐐𝐔𝐄 𝐃𝐄𝐒𝐒𝐄 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐈𝐑 𝐄𝐍 𝐕𝐈𝐃𝐄𝐎 𝐂𝐎𝐍 𝐄𝐋 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 🥖: ${usedPrefix + command}*`;
const mime = m.quoted.mimetype || '';
if (!/webp/.test(mime)) throw `*⚠️ 𝐑𝐄𝐒𝐏𝐎𝐍𝐃𝐄 𝐀 𝐔𝐍 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 𝐐𝐔𝐄 𝐃𝐄𝐒𝐒𝐄 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐈𝐑 𝐄𝐍 𝐕𝐈𝐃𝐄𝐎 𝐂𝐎𝐍 𝐄𝐋 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 🥖: ${usedPrefix + command}*`;
const media = await m.quoted.download();
let out = Buffer.alloc(0);
if (/webp/.test(mime)) {
out = await webp2mp4(media);
} else if (/audio/.test(mime)) {
out = await ffmpeg(media, ['-filter_complex', 'color',
'-pix_fmt', 'yuv420p',
'-crf', '51',
'-c:a', 'copy',
'-shortest', 
], 'mp3', 'mp4')}
await conn.sendFile(m.chat, out, 'error.mp4', '*✅ 𝐄𝐱𝐢𝐭𝐨*', m, null, fake, 0, {thumbnail: out});
};
handler.help = ['tovideo'];
handler.tags = ['convertidor']
handler.command = ['tovideo', 'tomp4', 'mp4', 'togif'];
handler.register = true
export default handler;
