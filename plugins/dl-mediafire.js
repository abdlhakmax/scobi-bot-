import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import {mediafiredl} from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, '🚩 يرحى وضع الرابط بعد الخاصية.', m)
if (!args[0].match(/mediafire/gi)) return conn.reply(m.chat, '🍟 تأكد من الىابط.', m)
try {
await m.react(rwait)
let { title, ext, aploud, size, dl_url } = await mediafiredl(args[0])
let txt = `乂  *¡MEDIAFIRE - DOWNLOADER!*  乂\n\n`
    txt += `✩ *اسم الملف* : ${title}\n`
    txt += `✩ *الحجم* : ${size}\n`
    txt += `✩ *تاريخ النشر* : ${aploud}\n`
    txt += `✩ *نوع الملف* : ${ext}\n\n`
    txt += `*- ↻ جاري التحميل. . .*`
let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer()
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, fkontak, null)
await conn.sendFile(m.chat, dl_url, title, null, fkontak, null, { mimetype: ext, asDocument: true })
await m.react(done)
} catch {
await m.react(error)
}}
handler.help = ['mediafire']
handler.tags = ['download']
handler.command = ['mediafire', 'mdfire', 'mf']
handler.premium = false

export default handler
