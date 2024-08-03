import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const bk9ApiUrl = 'https://bk9.fun/ai/gpt4?q=';
    const query = encodeURIComponent(text || '');
    const response = await fetch(bk9ApiUrl + query);
    const data = await response.json();

    if (data.status && data.BK9) {
      const apiResponse = data.BK9;
      conn.reply(m.chat, apiResponse, m);
    } else {
      throw new Error('An error occurred while processing your request.');
    }
  } catch (error) {
    throw new Error('An error occurred while processing your request.');
  }
};

handler.command = /^(gpt4)$/i;
handler.help = ['gpt4'];
handler.tags = ['ai'];

export default handler;
