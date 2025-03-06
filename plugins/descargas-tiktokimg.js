import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return m.reply(`*⚠️ 𝙄𝙣𝙜𝙧𝙚𝙨𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚 𝙙𝙚𝙡 𝙫𝙞𝙙𝙚𝙤 𝙦𝙪𝙚 𝙗𝙪𝙨𝙘𝙖𝙨.*\n𝙀𝙟𝙚𝙢𝙥𝙡𝙤: ${usedPrefix + command} Bolillos encuerados 🥖`);
m.react("⏳")
try {
let { data: response } = await axios.get(`${apis}/search/tiktoksearch?query=${text}`);
if (!response || !response.meta || !Array.isArray(response.meta) || response.meta.length === 0) return m.reply(`❌ No se encontraron resultados para "${text}".`);
let searchResults = response.meta;
shuffleArray(searchResults);
let selectedResults = searchResults.slice(0, 3)
let messages = selectedResults.map(result => [
`${result.title}`, 
wm,
result.hd
]);
await conn.sendCarousel(m.chat, `✅ Resultados para: ${text}`, "🔍 TikTok Search", messages, m);
m.react("✅️")
} catch (error) {
m.react("❌️")
console.error(error);    
}};
handler.help = ['tiktoksearch <texto>'];
handler.tags = ['downloader'];
handler.command = ['tiktoksearch', 'ttsearch'];
handler.register = true;
handler.limit = 4;

export default handler;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }