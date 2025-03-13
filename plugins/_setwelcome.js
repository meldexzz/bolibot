let handler = async (m, { conn, text, isROwner, isOwner }) => {

if (text) {
global.db.data.chats[m.chat].sWelcome = text
conn.reply(m.chat, '_*LA BIENVENIDA DEL GRUPO HA SIDO CONFIGURADA*_', m)

} else {
	m.reply('Agrega el texto que quieras de bienvenida\nPuedes usar los parámetros opcionales *@user* (para nombre del usuario) y *@subject* (para nombre del grupo)');
}
}


handler.command = ['setwelcome', 'bienvenida'] 
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler
