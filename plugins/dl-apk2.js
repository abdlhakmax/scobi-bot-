import { search, download } from 'aptoide-scraper';

var handler = async (m, {conn, usedPrefix, command, text}) => {
  if (!text) return conn.reply(m.chat, '🚩 *يرجى ادخال اسم التطبيق بعد الخاصية.*', m);

  try {
    await m.react(rwait);
    let searchResults = await search(text);

    if (searchResults.length === 0) {
      return conn.reply(m.chat, '🛑 *لم يتم العثور على أي تطبيقات.*', m);
    }

    let appOptions = [];
    for (let i = 0; i < Math.min(searchResults.length, 5); i++) { // عرض 5 خيارات كحد أقصى
      appOptions.push(`${i + 1}. ${searchResults[i].name} (${searchResults[i].package})`);
    }
    
    let optionsMessage = `*نتائج البحث:*\n\n${appOptions.join('\n')}\n\n*أدخل رقم التطبيق الذي تريد تحميله:*`;
    conn.reply(m.chat, optionsMessage, m);
    
    // انتظار اختيار المستخدم
    let choice = await new Promise(resolve => {
      conn.on('chat-update', update => {
        if (update.messages && update.messages[0].fromMe && update.messages[0].body) {
          let choiceNumber = parseInt(update.messages[0].body);
          if (choiceNumber > 0 && choiceNumber <= searchResults.length) {
            resolve(choiceNumber - 1);
          }
        }
      });
    });

    conn.reply(m.chat, '🚩 *جاري تحميل التطبيق...*', m, {
      contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
        title: packname,
        body: wm,
        previewType: 0, thumbnail: icons }}
    });

    let selectedApp = searchResults[choice];
    let data5 = await download(selectedApp.id);

    let txt = `*乂  APK - DOWNLOADER* 乂\n\n`;
    txt += `🍟 *اسم التطبيق* : ${data5.name}\n`;
    txt += `🚩 *الحزمة* : ${data5.package}\n`;
    txt += `🪴 *التحديث* : ${data5.lastup}\n`;
    txt += `⚖ *الحجم* :  ${data5.size}`;
    await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m, null, rcanal);
    await m.react(done);

    if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.reply(m.chat, '🛑 *لا أستطيع تحميل هذا التطبيق*', m);
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: fkontak});
  } catch (error) {
    console.error(error); // تسجيل أي أخطاء تحدث
    return conn.reply(m.chat, '🛑 *حدث خطأ ما*', m);
  }
};

handler.tags = ['download']
handler.help = ['apk']
handler.command = ['apk']
handler.register = false

export default handler
