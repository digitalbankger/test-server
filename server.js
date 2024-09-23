const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let isButtonActivated = false;
let pdfLink = '';

// Вебхук для активации кнопки и ссылки на PDF
app.post('/activate-button', (req, res) => {
  const { activated, link } = req.body;
  isButtonActivated = activated;
  pdfLink = link || 'https://example.com/sample.pdf'; // Стандартная ссылка на PDF
  res.sendStatus(200);
});

// Эндпоинт для получения состояния кнопки
app.get('/api/button-status', (req, res) => {
  res.json({ activated: isButtonActivated, pdfLink });
});

// Обслуживание клиентской части (React) после сборки
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
