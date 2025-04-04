const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createConnection({
  host: 'mysql',
  user: process.env.MYSQL_USER || 'testuser',
  password: process.env.MYSQL_PASSWORD || 'testpass',
  database: process.env.MYSQL_DATABASE || 'testdb'
});

db.connect(err => {
  if (err) {
    console.error('DB 연결 실패:', err.message);
  } else {
    console.log('MySQL 연결 성공');
  }
});

app.get('/', (req, res) => {
  db.query('SELECT NOW() as now', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(`Hello World! DB Time: ${results[0].now}`);
  });
});

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
