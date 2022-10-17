'use strict';

const { DB } = require('../database/databaseManager');

exports.getServiceInfo = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM SERVICE;";
    DB.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        }
        else resolve(rows);
      }
    );
  });
}