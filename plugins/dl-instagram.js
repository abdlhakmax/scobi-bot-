import { igdl } from "ruhend-scraper"

let handler = async (m, { args, conn }) => { 
if (!args[0]) {
return conn.reply(m.chat, '🍟 *يرجى ادخال الرابط بعد الخاصية*', m, rcanal)}
try {
await m.react(rwait)
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
