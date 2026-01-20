const express = require('express');
const app = express();

const mysql = require('mysql2/promise');

const port = process.env.PORT || 3017;

const dbConfig = {
	host: "host",
	user: "user",
	password: "password",
	database: "database",
	multipleStatements: false
};

var database = mysql.createPool(dbConfig);

async function printMySQLVersion() {
	let sqlQuery = `
		SHOW VARIABLES LIKE 'version';
	`;
	
	try {
		const results = await database.query(sqlQuery);
		console.log("Successfully connected to MySQL");
		console.log(results[0]);
		return true;
	}
	catch(err) {
		console.log("Error getting version from MySQL");
		return false;
	}
}


app.get('/', (req, res) => {
	console.log("page hit");
	const success = printMySQLVersion();
	
	if (success) {
		res.send(
			`<!doctype html>
			<html>
				<head></head>
				<body>
					<div>Connected to the database, check the Hosted logs for the results.</div>
				</body>
			</html>`
			);
	}
	else {
		res.status(500);
		res.send(
			`<!doctype html>
			<html>
				<head></head>
				<body>
					<div>Database error, check the Hosted logs for the details.</div>
				</body>
			</html>`);
		console.log("Error connecting to mysql");
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});



