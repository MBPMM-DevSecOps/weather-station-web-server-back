import express from 'express';
import bodyParser from 'body-parser';
import mariadb from 'mariadb';
import cors from 'cors';

const app = express().use('*', cors());;
const port = 3001;
const validToken = "auboulot";




const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send('Unauthorized request');
  }

  if (token !== validToken) {
    return res.status(400).send('Invalid token');
  }

  next();
};

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin_serre',
  password: '132456',
  database: 'data_serre',
});

/* const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  database: 'data_serre',
}); */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World fdp!');
});

app.post('/statistique', /* verifyToken, */(req, res) => {
  const { startDate, endDate } = req.body;
  pool.getConnection()
    .then(conn => {
      conn.query(`SELECT * FROM stats WHERE timestamp BETWEEN '${startDate}' AND '${endDate}'`)
        .then((rows) => {
          res.send(rows);
        })
        .catch(err => {
          res.send(err);
          conn.end();
        })
    }).catch(err => {
      console.log(err);
    });
});


app.listen(port, () => {
  return console.log("test");
});