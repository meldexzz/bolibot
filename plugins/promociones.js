const handler = async (m, { conn }) => {
  let mensaje = `
🎉 𝙋𝙍𝙊𝙈𝙊𝘾𝙄𝙊𝙉𝙀𝙎 𝙀𝙎𝙋𝙀𝘾𝙄𝘼𝙇𝙀𝙎 𝘽𝙊𝙇𝙄𝙇𝙇𝙊𝘽𝙊𝙏 🎉

¡𝘼𝙪́𝙣 𝙨𝙞𝙜𝙪𝙚 𝙡𝙖 𝙥𝙧𝙤𝙢𝙤𝙘𝙞ó𝙣! 🎄

🔥 𝙊𝙋𝘾𝙄Ó𝙉 𝟭:  ✅ 𝟯 𝘽𝙤𝙩𝙨 𝙥𝙤𝙧 𝙨𝙤𝙡𝙤 $𝟱 𝙐𝙎𝘿 🎁 
¡𝘼𝙥𝙧𝙤𝙫𝙚𝙘𝙝𝙖 𝙖𝙣𝙩𝙚𝙨 𝙦𝙪𝙚 𝙨𝙚 𝙖𝙘𝙖𝙗𝙚!

¡𝙇𝙡𝙚𝙫𝙖 𝙢á𝙨 𝙥𝙤𝙧 𝙢𝙚𝙣𝙤𝙨!

🔥 𝙊𝙋𝘾𝙄Ó𝙉 𝟮:  ✅ 𝘾𝙤𝙢𝙥𝙧𝙖 𝟰 𝙗𝙤𝙩𝙨 𝙮 𝙧𝙚𝙘𝙞𝙗𝙚 𝟮 𝙙𝙚 𝙧𝙚𝙜𝙖𝙡𝙤 🎁

📞 https://wa.link/rxfwr8  

`.trim();

  await conn.sendMessage(m.chat, { text: mensaje });
};

handler.command = /^(promociones)$/i;
export default handler;
