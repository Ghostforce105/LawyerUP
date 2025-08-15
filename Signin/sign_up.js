const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const crypto = require('crypto');

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
    console.error(' ❌Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to TiDB / MySQL database');
});


function generatePersonId() {
  const hash = crypto.randomBytes(4).toString('hex');
  return `U-${hash}`;
}
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  

  const person_id = generatePersonId();

  const insertQuery = 'INSERT INTO LOGIN (person_id, email, password) VALUES (?, ?, ?)';
  connection.query(insertQuery, [person_id, email, password], (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ success: false, message: 'Server/database error' });
    }

    console.log(`✅ New user inserted: ${person_id}`);
    res.json({ success: true, person_id });
  });
});


app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
