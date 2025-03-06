import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { Configuration, OpenAIApi } from "openai";

const apikey_base64 = "c2stcHJvai1tUzN4bGZueXo0UjBPWV8zbm1DVDlMQmlmYXhYbVdaa0ptUVFJMDVKR2FxdHZCbk9ncWZjRXdCbEJmMU5WN0lYa0pncVJuM3BNc1QzQmxia0ZKMVJ5aEJzUl93NzRXbll5LWdjdkowT0NQUXliWTBOcENCcDZIOTlCVVVtcWxuTjVraEZxMk43TGlMU0RsU0s1cXA5Tm1kWVZXc0E=";

const apikey = Buffer.from(apikey_base64, 'base64').toString('utf-8');
const configuration = new Configuration({apiKey: apikey, 
});
const openai = new OpenAIApi(configuration);

const handler = async (m, {conn, text, usedPrefix, command}) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/9d38415096b6c46bf03f8.jpg')
if (usedPrefix == 'a' || usedPrefix == 'A') return;
if (!text) return m.reply(`*Hola cómo esta 😊, El que te puedo ayudar?*, ingrese una petición o orden para usar la función de chagpt\n*Ejemplo:*\n${usedPrefix + command} Recomienda un top 10 de películas de acción`) 
let syst = `Actuaras como un Bot de WhatsApp el cual fue creado por Meldexzz, tu seras Bolillo Bot.`

if (command == 'ia' || command == 'chatgpt') {
await conn.sendPresenceUpdate('composing', m.chat)
try {     
async function getResponse(prompt) {
try {
await delay(1000); 
const response = await axios.post('https://api.openai.com/v1/chat/completions', 
{ model: 'gpt-4o-mini', 
messages: [{ role: 'user', content: prompt }],
max_tokens: 300,
}, { headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${apikey}`, 
}});
return response.data.choices[0].message.content;
} catch (error) {
console.error(error);
}}

const respuesta = await getResponse(text);
m.reply(respuesta);
} catch {
try { 
async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: true // true = resultado con url
});
return response.data.result;
} catch (error) {
console.error('Error al obtener:', error);
}}

let query = m.text;
let username = `${m.pushName}`;
//let syms1 = await fetch('https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/main/src/text-chatgpt.txt').then(v => v.text());
let syms1 = `Actuaras como un Bot de WhatsApp el cual fue creado por Meldexzz, tu seras Bolillo Bot`;  

let result = await luminsesi(query, username, syms1);
 await m.reply(result)
} catch {
try { 
let gpt = await fetch(`${apis}/ia/gptprompt?text=${text}?&prompt=${syms1}`) 
let res = await gpt.json()
await m.reply(res.data)
} catch {
try {
let gpt = await fetch(`${apis}/ia/gptweb?text=${text}`) 
let res = await gpt.json()
await m.reply(res.gpt)
/*let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/chatgpt?q=${text}`)
let res = await gpt.json()
await m.reply(res.data)*/
} catch {
}}}}}

if (command == 'openai' || command == 'ia2' || command == 'chatgpt2') {
conn.sendPresenceUpdate('composing', m.chat);
let gpt = await fetch(`${apis}/api/ia2?text=${text}`)
let res = await gpt.json()
await m.reply(res.gpt)
}

if (command == 'gemini') {
await conn.sendPresenceUpdate('composing', m.chat)
try {
let gpt = await fetch(`https://api.dorratz.com/ai/gemini?prompt=${text}`)
let res = await gpt.json()
await m.reply(res.message)
} catch {
try {
let gpt = await fetch(`${apis}/ia/gemini?query=${text}`)
let res = await gpt.json()
await m.reply(res.message)
} catch {
}}}

if (command == 'copilot' || command == 'bing') {
await conn.sendPresenceUpdate('composing', m.chat)
try {
let gpt = await fetch(`https://api.dorratz.com/ai/bing?prompt=${text}`)
let res = await gpt.json()
await conn.sendMessage(m.chat, { text: res.result.ai_response, contextInfo: {
externalAdReply: {
title: "[ IA COPILOT ]",
body: wm,
thumbnailUrl: "https://qu.ax/nTDgf.jpg", 
sourceUrl: [nna, nna2, nn, md, yt, tiktok].getRandom(),
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: m })
//m.reply(res.result.ai_response)
} catch {
try {
let gpt = await fetch(`${apis}/ia/bingia?query=${text}`)
let res = await gpt.json()
await m.reply(res.message)
} catch {
}}}}
handler.help = ["chagpt", "ia", "openai", "gemini", "copilot"]
handler.tags = ["buscadores"]
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|ia2|gemini|copilot|bing)$/i;
export default handler;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

