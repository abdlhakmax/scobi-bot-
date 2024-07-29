/*
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'

const defaultMenu = {
  before: `
*ELVEN - BOT - MD*

> ▧ مرحبا : %name
> ▧ نشط منذ : %muptime

%readmore`.trimStart(),
  header: '❏┄┅━┅┄〈 〘 *%category* 〙\n│',
    body: '┊▧ %cmd %islimit %isPremium',
  footer: '│\n┗━═┅═━━┅┄๑\n',
  after: '',
}
let handler = async (m, { conn, usedPrefix, command, __dirname, isOwner, isMods, isPrems, args }) => {
    let tags
    let teks = `${args[0]}`.toLowerCase()
    let arrayMenu = ['all', 'drawing', 'ai', 'downloader','image-edit','sticker', 'search', 'tools','infobot', 'owner']
    if (!arrayMenu.includes(teks)) teks = '404'
    if (teks == 'all') tags = {
        'drawing': 'قائمة الرسم 🎨',
        'ai': 'قائمة الدكاء الإسطناعي 🤖',
        'downloader': 'قائمة التحميل 📥',
        'image-edit':'قائمة تعديل الصور 🩻',
        'sticker': 'قائمة الملصقات 💟',
        'search': 'قائمة البحث 🔍',
        'tools': 'قائمة الأدوات ⚙️',
        'owner': 'قائمة المالك 👑', 
        'infobot': 'معلومات البوت ❕',
    }
    if (teks == 'drawing') tags = {
        'drawing': 'drawing'
    }
    if (teks == 'ai') tags = {
        'ai': 'ai'
    }
    if (teks == 'downloader') tags = {
        'downloader': 'downloader'
    }
    if (teks == 'image-edit') tags = {
        'image-edit': 'image-edit'
    }
    if (teks == 'sticker') tags = {
        'sticker': 'Sticker'
    }
    if (teks == 'search') tags = {
        'search': 'Searching'
    }
    if (teks == 'tools') tags = {
        'tools': 'Tools'
    }
    if (teks == 'owner') tags = {
        'owner': 'Owner'
    }
    if (teks == 'info') tags = {
        'infobot': 'infobot'
    }
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let tag = `@${m.sender.split('@')[0]}`
    let user = global.db.data.users[m.sender]
    let limit = isPrems ? 'Unlimited' : user.limit
    let name = user.registered ? user.name : conn.getName(m.sender)
    let status = isMods ? 'Developer' : isOwner ? 'Owner' : isPrems ? 'Premium User' : user.level > 1000 ? 'Elite User' : 'Free User'
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let listCmd =  `
*ELVEN - BOT - MD*

> ▧ Uptime : ${muptime}
`.trimStart()

    let rows = []
    for (let i = 0; i < arrayMenu.length; i++) {
        let result = {
            "header": "",
            "title": "" + capitalize(arrayMenu[i]),
             "id": usedPrefix + "menu " + arrayMenu[i]
        }
        rows.push(result)
    }
    let buttonMsg = {
        "title": "إضغط هنا ",
        "sections": [{
            "title": "List Menu",
            "highlight_label": "Popular",
            "rows": rows
        }]
    }

    let buttons = [{
        "name": "single_select",
        "buttonParamsJson": JSON.stringify(buttonMsg)
    }]
   // let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))

    if (teks == '404') {
        return conn.sendButtonImg(m.chat, 'https://telegra.ph/file/5dbcf152d3991a9b81f60.jpg', "", listCmd.trim(), " ", buttons, m, { 
            contextInfo: {
                mentionedJid: [m.sender],
            }
        })
    }
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
        help: Array.isArray(plugin.tags) ? plugin.help: [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags: [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
    }
    })
    let groups = {}
    for (let tag in tags) {
        groups[tag] = []
        for (let plugin of help)
            if (plugin.tags && plugin.tags.includes(tag))
            if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu: {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '': `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
            return header.replace(/%category/g, tags[tag]) + '\n' + [
                ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                    return menu.help.map(help => {
                        return body.replace(/%cmd/g, menu.prefix ? help: '%p' + help)
                        .replace(/%islimit/g, menu.limit ? '🅛' : '')
                        .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                        .trim()
                    }).join('\n')
                }),
                footer
            ].join('\n')
        }),
        after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu: typeof conn.menu == 'object' ? _text: ''
    let replace = {
      '%': '%',
      p: usedPrefix, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role, tag, status, wib, 
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    await conn
		.sendMessage(
			m.chat,
			{
				text: text,
				mentions: [m.sender],
				contextInfo: {
					forwardingScore: 9999999,
					isForwarded: false,
					mentionedJid: [m.sender],
					externalAdReply: {
						showAdAttribution: false,
						renderLargerThumbnail: true,
						title: ``,
						containsAutoReply: true,
						mediaType: 1,
						thumbnailUrl: `https://telegra.ph/file/b306e14fc211f1e47875a.jpg`,
						mediaUrl: ``,
						sourceUrl: "",
					},
				},
			},
			{ quoted: m },
		)
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu)$/i
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    wishloc = ('Hi')
    if (time >= 0) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 4) {
        wishloc = ('Selamat Pagi')
    }
    if (time >= 11) {
        wishloc = ('Selamat Siang')
    }
    if (time >= 15) {
        wishloc = ('️Selamat Sore')
    }
    if (time >= 18) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 23) {
        wishloc = ('Selamat Malam')
    }
    return wishloc
}

function clockString(ms) {
    let h = isNaN(ms) ? '--': Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--': Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--': Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1)
          }





*/
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'معلومات البوت 📚',
  'buscador': 'قائمة البحث 🔎',
  'fun': 'قائمة الألعاب 🎮',
  'jadibot': 'قائمة نسخ البوت 🤖',
  'rg': 'قائمة التسجيل 📁',
  'xp': 'EXP 🏷',
  'sticker': 'قائمة الملصقات 🏞',
  'anime': 'قائمة الأنميات 🍧',
  'database': 'DATABASE ✨️',
  'fix': 'FIXMSGESPERA 💭',
  'grupo': 'قائمة المجموعات 👥',
  'nable': 'ON / OFF 📴', 
  'descargas': 'قائمة التحميل 📥',
  'youtube': 'قائمة اليوتيوب 📥',
  'tools': 'قائمة الأدوات 🔧',
  'info': 'قائمة المعلومات 🐢',
  'owner': 'قائمة المالك 👑', 
  'mods': 'قائمة مساعدين المالك 🍟',
  'audio': 'قائمة الأصوات 🔉', 
  'ai': 'قائمة الدكاء الإسطناعي 🌹',
  'transformador': 'قائمة التحويل 🚩',
}

const defaultMenu = {
  before: `“ مرحبا *%name* ”

╭────═[ *INFO - BOT* ]═─────⋆
│╭───────────────···
┴│✯ 🍟 *Bot:* ElvenBot - MD 
✩│✯ ✨️ *Baileys:* Multi Device
✩│✯ ⌛️ *Uptime:* %muptime
┬│✯ 🫂 *Users:* %totalreg
│╰────────────────···
╰────────═┅═─────────
%readmore

\t*قائمة الخدمات* 
`.trimStart(),
      header: '╭───═[ %category ]═────⋆\n│╭───────────────···',
  body: '││ %cmd\n',
  footer: '│╰────────────────···\n╰────────═┅═─────────\n',
  after: `> ${dev}`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, estrellas, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        estrellas: plugin.estrellas,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
botofc: (conn.user.jid == global.conn.user.jid ? '🚩 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙱𝙾𝚃 𝙾𝙵𝙲' : `🚩 𝚂𝚄𝙱-𝙱𝙾𝚃 𝙳𝙴: Wa.me/${global.conn.user.jid.split`@`[0]}`), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, estrellas, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

  let category = "video"
  const db = './media/database/db.json'
  const db_ = JSON.parse(fs.readFileSync(db))
  const random = Math.floor(Math.random() * db_.links[category].length)
  const rlink = db_.links[category][random]
  global.vid = rlink
  const response = await fetch(vid)
  const gif = await response.buffer()

await m.react('📋') 

await conn.sendMessage(
  m.chat,
  { video: { url: vid }, caption: text.trim(),
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
  },

  gifPlayback: true, gifAttribution: 0 },
  { quoted: fkontak })

  } catch (e) {
    conn.reply(m.chat, '🔵 Lo sentimos, el menú tiene un error', m, rcanal, )
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'menuall', 'allmenú', 'allmenu', 'menucompleto'] 

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
  var greeting = hour;
 
