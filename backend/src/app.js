// server.js or app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/criterian1.1.1', (req, res) => {
  console.log(req.body);  // handle the data here
  res.status(200).send('Data received');
});

const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
