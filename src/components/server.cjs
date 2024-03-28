const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/Naac', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Criterion3Model = mongoose.model('Criterion3', {
  userName: String,
  filePath: String,
});

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  
  if (reqUrl.pathname === '/upload' && req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, 'uploads');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error parsing form. Please try again.' }));
        return;
      }

      const { userName } = fields;
      const { path: filePath } = files.file;

      const newDocument = new Criterion3Model({
        userName,
        filePath,
      });

      try {
        await newDocument.save();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'File uploaded successfully' }));
      } catch (error) {
        console.error('Error saving document:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error uploading file. Please try again.' }));
      }
    });
  } else if (reqUrl.pathname.startsWith('/uploads')) {
    const filePath = path.join(__dirname, reqUrl.pathname);
    fs.exists(filePath, exists => {
      if (exists) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Assuming files are images
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File not found' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
