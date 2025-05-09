const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Menyajikan file statis dari direktori 'public'

// Endpoint untuk menerima testimoni
app.post('/submit-testimonial', (req, res) => {
  const { name, email, message } = req.body;
  
  // Baca testimoni yang ada dari file
  fs.readFile('testimonials.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Gagal membaca file' });
    }

    let testimonials = [];
    if (data) {
      testimonials = JSON.parse(data);
    }

    // Tambahkan testimoni baru
    testimonials.push({ name, email, message });

    // Simpan testimoni ke file
    fs.writeFile('testimonials.json', JSON.stringify(testimonials, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Gagal menyimpan testimoni' });
      }
      res.json({ status: 'success' });
    });
  });
});

// Endpoint untuk mengambil testimoni
app.get('/get-testimonials', (req, res) => {
  fs.readFile('testimonials.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Gagal membaca file' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
