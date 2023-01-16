import express from 'express';
import bodyParser from 'body-parser';
import mariadb from 'mariadb';

const app = express();
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

/* const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin_serre',
  password: '132456',
  database: 'data_serre',
}); */

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  database: 'data_serre',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World fdp!');
});

app.post('/statistique', /* verifyToken, */ (req, res) => {
  const { startDate, endDate } = req.body;
/*   const query = `SELECT * FROM stats WHERE date BETWEEN '${startDate}' AND '${endDate}'`;
 */  const query = `SELECT * FROM stats`;
  pool.query(query
    , (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des statistiques');
      } else {
        console.log("retour");
        res.json(results);
      }
    });
});

app.listen(port, () => {
  return console.log("test");
});