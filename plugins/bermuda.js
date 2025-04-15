var handler = async (m, { conn, participants, groupMetadata, args, text }) => {

    const pp = 'https://i.ibb.co/7VjbcpT/mapa-de-versus-bermuda-2-0-remasterizada-768x768.png';

    const groupAdmins = participants.filter(p => p.admin);

    const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');

    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let texto = `> 𝘔𝘢𝘱𝘢 𝘣𝘦𝘳𝘮𝘶𝘥𝘢 𝘳𝘦𝘮𝘢𝘴𝘵𝘦𝘳𝘪𝘻𝘢𝘥𝘢.🥖`.trim();

    conn.sendFile(m.chat, pp, 'error.jpg', texto, m, true, { mentions: [...groupAdmins.map(v => v.id), owner] });

}

handler.tags = ['ffvs']

handler.command = /^(mapabermuda|bermu|bermuda|bermusa|bermua|bermudsa)$/i

handler.admin = true

handler.group = true

export default handler
