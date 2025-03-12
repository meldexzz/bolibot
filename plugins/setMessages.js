const handler = async (m, { conn, text, isAdmin }) => {
  if (!isAdmin) return m.reply(`🚫 *Solo los administradores pueden configurar los mensajes.*`);

  if (text) {
    const [command, ...message] = text.split(' ');
    const msg = message.join(' ');

    switch (command) {
      case 'catalogo':
        global.db.data.chats[m.chat].sCatalogo = msg;
        m.reply(`✅ *Mensaje del catálogo configurado correctamente para este grupo!*\n\n💬 ${msg}`);
        break;
      case 'comprar':
        global.db.data.chats[m.chat].sComprar = msg;
        m.reply(`✅ *Mensaje de compra configurado correctamente para este grupo!*\n\n💬 ${msg}`);
        break;
      case 'ofertas':
        global.db.data.chats[m.chat].sOfertas = msg;
        m.reply(`✅ *Mensaje de ofertas configurado correctamente para este grupo!*\n\n💬 ${msg}`);
        break;
      case 'combos':
        global.db.data.chats[m.chat].sCombos = msg;
        m.reply(`✅ *Mensaje de combos configurado correctamente para este grupo!*\n\n💬 ${msg}`);
        break;
      default:
        throw `⚠️ *Comando no válido. Use uno de los siguientes:* catalogo, comprar, ofertas, combos`;
    }
  } else {
    throw `⚠️ *Ingrese el mensaje que desea agregar, use:*\n*- .setcatalogo <mensaje>*\n*- .setcomprar <mensaje>*\n*- .setofertas <mensaje>*\n*- .setcombos <mensaje>*`;
  }
};

handler.help = ['setcatalogo <mensaje>', 'setcomprar <mensaje>', 'setofertas <mensaje>', 'setcombos <mensaje>'];
handler.tags = ['group'];
handler.command = ['setcatalogo', 'setcomprar', 'setofertas', 'setcombos'];
handler.admin = true;
handler.register = false;

export default handler;
