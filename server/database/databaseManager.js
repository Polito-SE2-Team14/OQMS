const sqlite = require('sqlite3');

// open the database
exports.DB = new sqlite.Database('./server/database/OQMS.db', (err) => {
  if (err) throw err;
});