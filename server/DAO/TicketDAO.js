'use strict';

const { DB } = require('../database/databaseManager');
const dayjs = require('dayjs');

exports.addNewTicket = (serviceID) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO Ticket( SERVICEID, TIMESTAMP , DATE , SERVED ) VALUES (?,?,?,0)";
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
    const sql = "SELECT COUNT(ID) N FROM Ticket WHERE SERVICEID = ? AND SERVED = 0";
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


exports.getNextClient = (serviceIds) => {
  const sql = "SELECT id, timestamp from Ticket WHERE serviceId = ? AND served = 0";
  let now = dayjs().unix();

  let tickets = [];
  serviceIds.forEach(serviceId => {
    tickets.push(new Promise((resolve, reject) => {
      DB.all(sql, [serviceId], (err, rows) => {
          if (err)
            reject(err);
          else
            resolve(rows.map(row => {
              return {
                id: row.ID,
                wait: now - dayjs(row.TIMESTAMP).unix()
              }
            }));
        });
    }))
  });

  return Promise.all(tickets).then(ids => {
    let max = [0, 0];

    ids.forEach(array => {
      for(id in array)
        if (id.wait > max[1])
          max = [id.id, id.wait]
    });

    return max[0];
  });
}

exports.setServedClient = ticketId => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE Ticket SET served = 1 WHERE ticketId = ?";
    DB.run(sql, [ticketId], err => {
        if (err)
          reject(err);
        else
          resolve(ticketId);
      });
  });
}