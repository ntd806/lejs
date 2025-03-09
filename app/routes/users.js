var express = require('express');
var router = express.Router();
const pool = require('../db');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/read-pdf', async (req, res) => {
  try {
      const filePath = path.join(__dirname, 'data.pdf'); // Xây dựng đường dẫn tuyệt đối đến file PDF

      if (!fs.existsSync(filePath)) {
          return res.status(404).send('File PDF không tồn tại');
      }

      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);

      // Extract "Từ vựng" fields
      const tuVungFields = data.text.match(/Từ vựng:.*$/gm);

      res.json({
          text: data.text, // Nội dung văn bản từ PDF
          info: data.info, // Metadata của PDF
          tuVungFields: tuVungFields // Các trường "Từ vựng"
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Lỗi khi xử lý PDF');
  }
});

module.exports = router;