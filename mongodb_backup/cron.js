const cron = require('node-cron');

const Cron = require('./index');

/**
 * Scheduling Daily status report
 * 
 * Every day 5 : 00 PM
 * 
 */
cron.schedule('50 11 * * *', async () => {

    Cron.dbAutoBackUp()

}, {
    timezone: "Asia/Kolkata"
});