'use strict';

const { DB } = require('../database/databaseManager');
const dayjs = require('dayjs');

exports.addNewTicket = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO Ticket( SERVICEID, TIMESTAMP , DATE ) VALUES (?,?,?)";
    DB.run(sql, [serviceID, Date.now, dayjs().format('DD/MM/YYYY')],
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
    const sql = "SELECT COUNT(DISTINCT ID) N FROM Counter WHERE SERVICEID = ?";
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

exports.getCountInQueueForService = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(DISTINCT ID) N FROM Counter WHERE SERVICEID = ?";
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

exports.getCountServicesForCounter = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(DISTINCT ID) N FROM Counter WHERE SERVICEID = ?";
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

exports.getAllCountersForService = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM test WHERE test = ?';
    DB.all(sql, [serviceID], (err, rows) => {
      if (err)
        reject(err);
      else {
        resolve(rows);
      }
    });
  });
};