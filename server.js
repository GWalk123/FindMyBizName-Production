const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    platform: 'FindMyBizName - Complete Business Operating System',
    market: '430.5M underbanked entrepreneurs'
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    platform: 'FindMyBizName',
    status: 'LIVE',
    positioning: 'The First Complete Global Business Operating System for Underbanked Entrepreneurs'
  });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('FindMyBizName server running on port', PORT);
});
