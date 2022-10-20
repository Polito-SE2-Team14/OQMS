'use strict';

const { DB } = require('../database/databaseManager');

exports.getAllCountersForService = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Counter WHERE SERVICEID = ?';
    DB.all(sql, [serviceID], (err, rows) => {
      if (err)
        reject(err);
      else {
        resolve(rows);
      }
    });
  });
};

exports.getCountServicesForCounter = (counterID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(DISTINCT SERVICEID) N FROM Counter WHERE COUNTERID = ?";
    DB.get(sql, [counterID],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.N);
        }
      });
  });
}

exports.getServicesForCounter = (counterID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT DISTINCT serviceId FROM Counter WHERE counterId = ?";
    DB.all(sql, [counterID],
      (err, rows) => {
        if (err) {
          console.log("service error")
          reject(err);
        } else {
          resolve(rows);
        }
      });
  });
}