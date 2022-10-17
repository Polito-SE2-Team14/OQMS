'use strict';

const { DB } = require('../database');

exports.getServiceInfo = () => {
  return new Promise((resolve, reject) => {
    const sql = "";
    DB.all(sql,
      function (err, row) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
}