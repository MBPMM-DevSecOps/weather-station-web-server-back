import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();
const port = 3001;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin_serre',
  password: '13246',
  database: 'data_serre'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World fdp!');
});

app.post('/statistique', (req, res) => {
  const { startDate, endDate } = req.body;
  const query = `SELECT * FROM statistique WHERE date BETWEEN '${startDate}' AND '${endDate}'`;
  connection.query(query
    , (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des statistiques');
      } else {
        res.json(results);
      }
    });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});