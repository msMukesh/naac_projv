const upload = require('../middlewares/criterionUpload2.1.1')
const express = require('express')

const router = express()

router.post('/upload', upload.single('file'), (req, res) => {
      res.json({ message: 'File uploaded successfully!' });
});

module.exports = router;