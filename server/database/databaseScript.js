/**
 * This module creates the database and resets the queues, the function relatives to these functions are at the end ofthe file
 * The database file will be "OQMS.db"
 */

const crypto = require('crypto');
const { DB } = require('./databaseManager');

function create() {
	let sql = [];
	sql.push('CREATE TABLE IF NOT EXISTS User(ID INTEGER PRIMARY KEY, USERNAME VARCHAR, PASSWORD VARCHAR, SALT VARCHAR, ROLEID INTEGER)');
	sql.push('CREATE TABLE IF NOT EXISTS Role(ID INTEGER PRIMARY KEY, ROLE VARCHAR)');
	sql.push('CREATE TABLE IF NOT EXISTS Service(ID INTEGER PRIMARY KEY, NAME VARCHAR, DURATION INTEGER)');
	sql.push('CREATE TABLE IF NOT EXISTS Ticket(ID INTEGER PRIMARY KEY, SERVICEID INTEGER, TIMESTAMP VARCHAR, DATE VARCHAR)');
	sql.push('CREATE TABLE IF NOT EXISTS Counter(ID INTEGER PRIMARY KEY, COUNTERID INTEGER, SERVICEID INTEGER)');
	sql.push('CREATE TABLE IF NOT EXISTS Served(ID INTEGER PRIMARY KEY, TICKETID INTEGER, COUNTERID INTEGER)');

	let create = [];
	sql.forEach(s => {
		create.push(new Promise((resolve, reject) =>
			DB.run(s, [], err => {
				if (err) reject(err);
				else resolve();
			})
		));
	});

	return create;
}

function populate() {
	let userSql = 'INSERT OR IGNORE INTO User(USERNAME, PASSWORD, SALT, ROLEID) VALUES(?, ?, ?, ?)';
	let users = [];
	users.push({ email: 'manager@ex.com', role: 0 });
	users.push({ email: 'clerk@ex.com', role: 1 });

	let roleSql = 'INSERT OR IGNORE INTO Role(ROLE) VALUES (?)';
	let roles = [];
	roles.push({ role: 'manager' });
	roles.push({ role: 'clerk' });

	let serviceSql = 'INSERT OR IGNORE INTO Service(NAME, DURATION) VALUES (?, ?)';
	let services = [];
	services.push({});
	services.push({});

	let ticketSql = 'INSERT OR IGNORE INTO Ticket(SERVICEID, TIMESTAMP, DATE) VALUES (?, ?, ?)';
	let tickets = [];
	tickets.push({});
	tickets.push({});

	let counterSql = 'INSERT OR IGNORE INTO Counter(COUNTERID, SERVICEID) VALUES (?, ?)';
	let counters = [];
	counters.push({});
	counters.push({});

	let servedSql = 'INSERT OR IGNORE INTO Served(TICKETID, COUNTERID) VALUES (?, ?)';
	let served = [];
	served.push({});
	served.push({});

	let population = [];
	users.forEach(user => {
		population.push(new Promise((resolve, reject) => {
			let salt = crypto.randomBytes(16);

			crypto.scrypt('testpassword', salt, 32, (err, hashedPassword) => {
				if (err) reject(err);
				else {
					user.password = hashedPassword.toString('base64');
					user.salt = salt.toString('base64');

					resolve(user);
				}
			});
		}).then((user) => new Promise((resolve, reject) =>
			DB.run(userSql, [user.id, user.email, user.password, user.salt, user.type], err => {
				if (err) reject(err);
				else resolve();
			})
		)));
	});
	roles.forEach(role =>
		population.push(new Promise((resolve, reject) =>
			DB.run(roleSql, [role.role], err => {
				if (err) reject(err);
				else resolve();
			})
		))
	);
	/*services.forEach(service =>
		population.push(new Promise((resolve, reject) =>
			DB.run(serviceSql, [], err => {
				if (err) reject(err);
				else resolve();
			})
		))
	);
	tickets.forEach(ticket =>
		population.push(new Promise((resolve, reject) =>
			DB.run(ticketSql, [], err => {
				if (err) reject(err);
				else resolve();
			})
		))
	);
	counters.forEach(counter =>
		population.push(new Promise((resolve, reject) =>
			DB.run(counterSql, [], err => {
				if (err) reject(err);
				else resolve();
			})
		))
	);
	served.forEach(serve =>
		population.push(new Promise((resolve, reject) =>
			DB.run(servedSql, [], err => {
				if (err) reject(err);
				else resolve();
			})
		))
	);*/

	return population;
}

function drop() {
	let sql = [];
	sql.push('DROP TABLE IF EXISTS User');
	sql.push('DROP TABLE IF EXISTS Role');
	sql.push('DROP TABLE IF EXISTS Service');
	sql.push('DROP TABLE IF EXISTS Ticket');
	sql.push('DROP TABLE IF EXISTS Counter');
	sql.push('DROP TABLE IF EXISTS Served');

	let drop = [];
	sql.forEach(s =>
		drop.push(new Promise((resolve, reject) =>
			DB.run(s, [], err => {
				if (err) reject(err);
				else resolve();
			})
		))
	);

	return drop;
}

/**
 * Creates tables and populates them with default values
 */
exports.start = () =>
	Promise.all(drop()).then(() => create()).then(() => populate()).catch(err => console.error(err));

/**
 * Daily reset of the queues
 */
exports.resetQueues = () =>
	new Promise((resolve, reject) => 
		DB.run('DELETE FROM Ticket', [], err => {
			if (err) reject(err);
			else resolve();
		})
	);

Promise.all(/*drop()).then(() => */create()).then(() => populate()).catch(err => console.error(err));