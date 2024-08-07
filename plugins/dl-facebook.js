import { igdl } from 'ruhend-scraper'

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) {
return conn.reply(m.chat, '🍟 *Ingresa Un Link De Facebook*', m)}
let res
try {
conn.reply(m.chat, `🕒 *جاري التحميل...*`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
await m.react(rwait)
res = await igdl(args[0])
} catch {
await m.react(error)
return conn.reply(m.chat, '🚩 *تأكد من الرابط.*', m, fake)}
let result = res.data
if (!result || result.length === 0) {
return conn.reply(m.chat, '🚩 *No se encontraron resultados.*', m, fake)}
let data
try {
await m.react(rwait)
data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)")
} catch {
await m.react(error)
return conn.reply(m.chat, '🚩 *Error al procesar los datos.*', m)}
if (!data) {
return conn.reply(m.chat, '🚩 *No se encontró una resolución adecuada.*', m)}
let video = data.url
try {
await m.react(rwait)
await conn.sendMessage(m.chat, { video: { url: video }, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: fkontak })
await m.react(done)
} catch {
await m.react(error)
return conn.reply(m.chat, '🚩 *حدث خطأ ما.*', m)}}

handler.help = ['facebook', 'fb']
handler.tags = ['download']
handler.command = ['facebook', 'fb']

export default handler
