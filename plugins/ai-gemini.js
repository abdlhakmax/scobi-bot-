import fetch from 'node-fetch';
import uploader from '../lib/uploadImage.js';

const handler = async (m, { conn, text, command, usedPrefix }) => {
    try {
        if (!text) {
            throw `يرحى اضافة السؤال بعد الخاصية\n\n*مثال* : ${usedPrefix + command} مرحبا`;
        }

        let BK9api, BK9img;
        if (m.quoted && /image/g.test((m.quoted.msg || m.quoted).mimetype || m.quoted.mediaType || '') && !/webp/g.test((m.quoted.msg || m.quoted).mimetype || m.quoted.mediaType || '')) {
            let BK0 = await m.quoted.download();
            BK9img = await uploader(BK0);
            BK9api = await (await fetch(`https://bk9.fun/ai/geminiimg?url=${BK9img}&q=${text}`)).json();
        } else {
            BK9api = await (await fetch(`https://bk9.fun/ai/gemini?q=${encodeURIComponent(text)}`)).json();
        }

        if (BK9api.status && BK9api.BK9) {
            const respuestaAPI = BK9api.BK9;
            conn.reply(m.chat, respuestaAPI, m);
        } else {
            throw "حدث خطأ أثناء معالجة طلبك.";
            console.log(error);
        }
    } catch (error) {
        if (typeof error === 'string') throw error;
        throw `حدث خطأ أثناء معالجة طلبك.`;
        console.log(error);
    }
};

handler.help = ['gemini', 'bard'];
handler.tags = ['ai'];
handler.command = /^(gemini|bard)$/i;

export default handler;
