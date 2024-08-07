import { igdl } from "ruhend-scraper"

let handler = async (m, { args, conn }) => { 
if (!args[0]) {
return conn.reply(m.chat, '🍟 *Ingresa un link de Instagram*', m, rcanal)}
try {
await m.react(rwait)
conn.reply(m.chat, `🕒 *Enviando El Video...*`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})      
let res = await igdl(args[0])
let data = res.data       
for (let media of data) {
await new Promise(resolve => setTimeout(resolve, 2000))           
await conn.sendFile(m.chat, media.url, 'instagram.mp4', fkontak)
}} catch {
await m.react(error)
conn.reply(m.chat, '🚩 حدث خطأ ما.', m, fake)}}

handler.command = ['instagram', 'ig']
handler.tags = ['download']
handler.help = ['instagram', 'ig']
handler.estrellas = 1
handler.register = false

export default handler
