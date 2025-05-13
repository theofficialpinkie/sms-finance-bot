require('dotenv').config();

const { getBalances, getYesterdaySpend, getMonthlySpend } = require('./plaid');
const { formatBalances, formatSpend } = require('./utils');

(async () => {
  try {
    const balances = await getBalances();
    const yesterdayTransactions = await getYesterdaySpend();
    const { total: monthlyTotal } = await getMonthlySpend();

    const message =
      `[ Daily Finance Update]\n` +
      formatBalances(balances) +
      `\n\n` +
      formatSpend(yesterdayTransactions) +
      `\n\n` +
      `Monthly Spend: $${monthlyTotal}`;

    console.log(message);
  } catch (err) {
    console.error('❌ Error generating report:', err.message);
  }
})();
