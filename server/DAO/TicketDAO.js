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
  const sql = "SELECT id, date, timestamp from Ticket WHERE serviceId = ? AND served = 0";
  let now = dayjs().unix();


  let tickets = [];
  serviceIds.forEach(serviceId => {
    tickets.push(new Promise((resolve, reject) => {
      DB.all(sql, [serviceId.SERVICEID], (err, rows) => {
          if (err){
            console.log("ticket selection error")
            reject(err);
          }
          else
            {
              resolve(rows.map(row => {
                let correct_format_date = row.DATE.split('-').reverse().join('-');
              return {
                id: row.ID,
                wait: now - dayjs(correct_format_date + " " + row.TIMESTAMP).unix()
              }
            }));}
        });
    }))
  });

  
  return Promise.all(tickets).then(ids => {
    let max_wait = 0;
    let ticket_id = "";

    ids.flat().forEach((ticket) => {
      if(ticket.wait >= max_wait) {
        max_wait = ticket.wait;
        ticket_id = ticket.id;
      }
    })

    console.log(ticket_id);
    return ticket_id;
  });
}

exports.setServedClient = ticketId => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE Ticket SET served = 1 WHERE id = ?";
    DB.run(sql, [ticketId], err => {
        if (err){
          console.log("ticket update error")
          reject(err);
        }
        
        resolve(ticketId);
      });
  });
}