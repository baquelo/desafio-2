const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.connect();



const sqlCreate = `CREATE TABLE IF NOT EXISTS people
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    PRIMARY KEY(id)
);`;

connection.query(sqlCreate, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

const sql = `INSERT INTO people (name) values ('Marcelo');`;

connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();

app.get('/', (req, res) => {

    const connection = mysql.createConnection(config);
    connection.connect();

    const sql = `SELECT * FROM people`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;

        let names = '';

        results.forEach(people => {
            console.log('People: ', people.name);
            names += '<br>' + people.name
        })


        res.send('<h1>Full Cycle</h1><h2>Names</h2>' + names)
    });
    connection.end();
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})