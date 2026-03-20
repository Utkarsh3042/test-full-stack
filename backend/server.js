require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ 
    success: true,
    message: 'Hello from the smooth Express Backend!', 
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
