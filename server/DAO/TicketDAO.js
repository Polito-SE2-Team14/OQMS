'use strict';

const { DB } = require('../database/databaseManager');
const dayjs = require('dayjs');

exports.addNewTicket = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO Ticket( SERVICEID, TIMESTAMP , DATE ) VALUES (?,?,?)";
    DB.run(sql, [serviceID, dayjs().format('HH:mm:ss'), dayjs().format('DD-MM-YYYY')],
      function (err, row) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
}


exports.getCountInQueueForService = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(ID) N FROM Ticket WHERE SERVICEID = ?";
    DB.get(sql, [serviceID],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.N);
        }
      });
  });
}
