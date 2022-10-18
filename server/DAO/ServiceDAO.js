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

exports.getOneServiceInfo = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM SERVICE WHERE ID = ?';
    DB.get(sql, [serviceID], (err, row) => {
      if (err)
        reject(err);
      else {
        resolve(row);
      }
    });
  });
};