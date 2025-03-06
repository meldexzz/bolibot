const palabras = [
    "gato", "perro", "pájaro", "elefante", "tigre", "ballena", "mariposa", "tortuga", "conejo", "rana", "pulpo", "ardilla", "jirafa", "cocodrilo", "pingüino", "delfín", "serpiente", "hámster", "mosquito", "abeja", "television", "computadora", "economía", "electrónica", "facebook", "WhatsApp", "Instagram", "tiktok", "milanesa", "presidente", "bot", "películas"
];

const intentosMaximos = 6;
const gam = new Map();

function elegirPalabraAleatoria() {
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function ocultarPalabra(palabra, letrasAdivinadas) {
    return palabra.split('').map(letra => letrasAdivinadas.includes(letra) ? letra : '_').join(' ');
}

function mostrarAhorcado(intentos) {
    const dibujo = [
        " ____", " |  |",
        intentos < 6 ? " |  O" : " |",
        intentos < 5 ? " | /" : intentos < 4 ? " | / " : intentos < 3 ? " | / \\" : " |",
        intentos < 2 ? "_|_" : " |",
    ];
    return dibujo.slice(0, intentosMaximos - intentos).join("\n");
}

function juegoTerminado(sender, mensaje, palabra, letrasAdivinadas, intentos) {
    if (intentos === 0) {
        gam.delete(sender);
        return `❌ ¡Perdiste! La palabra correcta era: ${palabra}\n\n${mostrarAhorcado(intentos)}`;
    } else if (!mensaje.includes("_")) {
        let expGanada = palabra.length >= 8 ? Math.floor(Math.random() * 3500) : Math.floor(Math.random() * 300);
        global.db.data.users[sender].exp = (global.db.data.users[sender].exp || 0) + expGanada;
        gam.delete(sender);
        return `🎉 ¡Ganaste! Adivinaste la palabra "${palabra}".\n\n*Has ganado:* ${expGanada} Exp.`;
    } else {
        return `${mostrarAhorcado(intentos)}\n\n${mensaje}`;
    }
}

let handler = async (m, { conn }) => {
    if (gam.has(m.sender)) {
        return conn.reply(m.chat, "⚠️ Ya tienes un juego en curso. ¡Termina ese primero!", m);
    }
    let palabra = elegirPalabraAleatoria();
    let letrasAdivinadas = [];
    let intentos = intentosMaximos;
    let mensaje = ocultarPalabra(palabra, letrasAdivinadas);
    gam.set(m.sender, { palabra, letrasAdivinadas, intentos });
    let text = `🎮 ¡Adivina la palabra!\n\n${mensaje}\n\nIntentos restantes: ${intentos}`;
    conn.reply(m.chat, text, m);
};

handler.before = async (m, { conn }) => {
    let juego = gam.get(m.sender);
    if (!juego) return;
    let { palabra, letrasAdivinadas, intentos } = juego;
    let letra = m.text.toLowerCase();
    
    if (letra.length === 1 && letra.match(/[a-zA-Záéíóúüñ]/)) {
        if (!letrasAdivinadas.includes(letra)) {
            letrasAdivinadas.push(letra);
            if (!palabra.includes(letra)) {
                intentos--;
            }
        }
        let mensaje = ocultarPalabra(palabra, letrasAdivinadas);
        let respuesta = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, intentos);
        if (respuesta.includes("¡Perdiste!") || respuesta.includes("¡Ganaste!")) {
            conn.reply(m.chat, respuesta, m);
            gam.delete(m.sender);
        } else {
            gam.set(m.sender, { palabra, letrasAdivinadas, intentos });
            conn.reply(m.chat, respuesta + `\n\nIntentos restantes: ${intentos}`, m);
        }
    }
};

handler.help = ['ahorcado'];
handler.tags = ['game'];
handler.command = ['ahorcado'];
handler.register = true;
export default handler;
