const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const nickRegistry = new Map(); // ip -> nick

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/my-nick', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  res.json({ nick: nickRegistry.get(ip) || null });
});

app.post('/api/register-nick', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  const { nick } = req.body || {};
  if (!nick) return res.json({ ok: false, reason: 'empty' });
  const existing = nickRegistry.get(ip);
  if (existing && existing !== nick) return res.json({ ok: false, existingNick: existing });
  for (const [ip2, nick2] of nickRegistry) {
    if (nick2 === nick && ip2 !== ip) return res.json({ ok: false, reason: 'taken' });
  }
  nickRegistry.set(ip, nick);
  res.json({ ok: true });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`\n⚽ 축구 내기 앱 실행 중!\n👉 http://localhost:${PORT}\n`));
