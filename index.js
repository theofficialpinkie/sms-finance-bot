require('dotenv').config(); // Load .env early

const { getBalances, getYesterdaySpend } = require('./plaid');
const { formatBalances, formatSpend } = require('./utils');

(async () => {
  try {
    const balances = await getBalances();
    const transactions = await getYesterdaySpend();

    const message =
      `[Finance Update]\n` +
      formatBalances(balances) +
      `\n\n` +
      formatSpend(transactions);

    console.log(message);
  } catch (err) {
    console.error('❌ Error generating report:', err.message);
  }
})();