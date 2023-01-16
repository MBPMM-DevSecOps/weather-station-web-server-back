import express from 'express';
import bodyParser from 'body-parser';
import mariadb from 'mariadb';

const app = express();
const port = 3001;

const connection = mariadb.createConnection({
host: 'localhost',
user: 'admin_serre',
password: '132456',
database: 'data_serre'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
res.send('Hello World fdp!');
});

app.post('/statistique', (req, res) => {
const { startDate, endDate } = req.body;
const query = SELECT * FROM data_serre WHERE timestamp BETWEEN '${startDate}' AND '${endDate}';
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
return console.log(Express is listening at http://localhost:${port});
});