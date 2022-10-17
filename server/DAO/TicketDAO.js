'use strict';

const { DB } = require('../database/databaseManager');

exports.addNewTicket = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO Ticket( SERVICEID, TIMESTAMP , DATE ) VALUES (?,?,?)";
    DB.run(sql, [serviceID, Date.now, "DAYJS"],
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


exports.calculateWaitingTime = (serviceID) => {
  return new Promise((resolve, reject) => {
    resolve("");
  });
}