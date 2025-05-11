const { getYesterdayDate } = require('./utils');
const { getYesterdaySpend } = require('./plaid');
require('dotenv').config(); // Loads .env file
const { getBalances } = require('./plaid'); // Imports your balance function

//(async () => {
 // try {
 //   const balances = await getBalances();
 //   console.log('💰 Balances:', balances);
 // } catch (err) {
 //   console.error('❌ Error fetching balances:', err.message);
 //   console.log('📅 Yesterday was:', getYesterdayDate());
 // }
// })();

(async () => {
    const spend = await getYesterdaySpend();
    console.log('🧾 Yesterday’s Transactions:\n', spend);
  })();