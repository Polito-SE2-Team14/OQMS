'use strict';

/**
 * Constructor function
 * @param {number|null} ID 
 * @param {string} SERVICEID 
 * @param {number} TIMESTAMP
 * @param {string} DATE
 */
function Ticket(SERVICEID, TIMESTAMP, DATE, ID = null) {
    this.ID = ID;
    this.SERVICEID = SERVICEID;
    this.TIMESTAMP = TIMESTAMP;
    this.DATE = DATE;
}

exports.Ticket = Ticket;