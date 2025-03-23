const handler = async (m, {conn, text, isROwner, isOwner}) => {
if (text) {
global.db.data.chats[m.chat].sBye = text;
m.reply('𝘓𝘢 𝘥𝘦𝘴𝘱𝘦𝘥𝘪𝘥𝘢 𝘩𝘢 𝘴𝘪𝘥𝘰 𝘮𝘰𝘥𝘪𝘧𝘪𝘤𝘢𝘥𝘢.🥖');
} else throw `*𝘌𝘴𝘤𝘳𝘪𝘣𝘦 𝘭𝘢 𝘥𝘦𝘴𝘱𝘦𝘥𝘪𝘥𝘢 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘮𝘰𝘥𝘪𝘧𝘪𝘤𝘢𝘳, 𝘦𝘫𝘦𝘮𝘱𝘭𝘰: .𝘴𝘦𝘵𝘣𝘺𝘦 (𝘵𝘦𝘹𝘵𝘰)🥖`;
};
handler.help = ['setbye <text>'];
handler.tags = ['group'];
handler.command = ['setbye'];
handler.admin = true;
handler.register = false 
export default handler;
