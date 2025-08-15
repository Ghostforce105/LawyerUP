
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
  user: '4ZAdQWKizdQMFvp.root',
  password: 'cwD1mPoSbn7TzzIk',
  database: 'LAWYERUP',
  port: 4000,
  ssl: { rejectUnauthorized: true }
});

connection.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to TiDB / MySQL database');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM LOGIN WHERE email = ? and password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length > 0) {
      console.log('yes');
      res.json({ success: true });
    } else {
      console.log('no');
      res.json({ success: false });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
