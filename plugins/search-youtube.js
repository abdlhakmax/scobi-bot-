import yts from 'yt-search';
import fs from 'fs';
const handler = async (m, {conn, text}) => {
  if (!text) throw ' _ضع عنوان الفيديو الذي تريد البحث عنه بعد الخاص>
  const results = await yts(text);
  const tes = results.all;
  const teks = results.all.map((v) => {
    switch (v.type) {
      case 'video': return `
° *_${v.title}_*
↳   *_الرابط :_* ${v.url}
↳ 📍 *_تاريخ النشر :_* ${v.timestamp}
↳   *_S :_* ${v.ago}
↳ 👁 *_المشاهدات:_* ${v.views}`;
    }
  }).filter((v) => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m);
};
handler.help = ['ytsearch *<text>*'];
handler.tags = ['search'];
handler.command = ['ytsearch', 'yts'];
export default handler;
