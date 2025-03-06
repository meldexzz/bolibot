const respondToCommands = async (m, { conn }) => {
  let chatData = global.db.data.chats[m.chat];

  if (m.text.startsWith('.')) {
    const command = m.text.slice(1).toLowerCase();

    if (command === 'catalogo') {
      const msg = chatData.sCatalogo || '⚠️ No hay un mensaje configurado para el catálogo.';
      conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    } else if (command === 'comprar') {
      const msg = chatData.sComprar || '⚠️ No hay un mensaje configurado para comprar.';
      conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    } else if (command === 'ofertas') {
      const msg = chatData.sOfertas || '⚠️ No hay un mensaje configurado para ofertas.';
      conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    } else if (command === 'combos') {
      const msg = chatData.sCombos || '⚠️ No hay un mensaje configurado para combos.';
      conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};

export const commandResponder = respondToCommands;
