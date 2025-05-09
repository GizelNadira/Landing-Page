const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/submit-testimonial', (req, res) => {
  const { name, email, message } = req.body;
  
  // Simpan data ke database atau file di sini
  // Contoh sederhana:
  console.log('Pesan baru:', { name, email, message });

  res.json({ status: 'success' });
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
