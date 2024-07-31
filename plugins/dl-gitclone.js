import fetch from 'node-fetch';
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.>
const handler = async (m, {args, usedPrefix, command}) => {
  if (!args[0]) throw `  *يرجى وضع الرابط بعد الخاصية.*
 مثال:
${usedPrefix + command} https://github.com/GX004/ElvenBot-MD`;
  if (!regex.test(args[0])) throw '*📍 Link Incorrecto!*';
  let [_, user, repo] = args[0].match(regex) || [];
  repo = repo.replace(/.git$/, '');
  const url = `https://api.github.com/repos/${user}/${repo}/zipball`;
  const filename = (await fetch(url, {method: 'HEAD'})).headers.get(>
  m.reply(`⏰  _جاري التحميل...._`);
  conn.sendFile(m.chat, url, filename, null, m);
};
handler.help = ['gitclone <url>'];
handler.tags = ['downloader'];
handler.command = /gitclone/i;
handler.register = true
export default handler;
