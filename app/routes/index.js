var express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
var router = express.Router();

// Cấu hình multer để upload file PDF
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-pdf', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Vui lòng tải lên một file PDF');
        }

        const dataBuffer = req.file.buffer;
        const data = await pdfParse(dataBuffer);

        res.json({
            text: data.text, // Nội dung văn bản từ PDF
            info: data.info  // Metadata của PDF
        });
    } catch (error) {
        res.status(500).send('Lỗi khi xử lý PDF');
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
