require('dotenv').config();
const { getYesterdayDate } = require('./utils');
const plaid = require('plaid');

const client = new plaid.PlaidApi(
  new plaid.Configuration({
    basePath: plaid.PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
  })
);

async function getYesterdaySpend() {
  try {
    const start_date = '2025-05-02';
    const end_date = '2025-05-02';

    const response = await client.transactionsGet({
        access_token: process.env.PLAID_ACCESS_TOKEN,
        start_date,
        end_date,
        options: { count: 10, offset: 0 },
      });

    const transactions = response.data.transactions;

    // Simplify results
    const cleaned = transactions.map(txn => ({
      name: txn.name,
      amount: txn.amount.toFixed(2),
    }));

    return cleaned;
  } catch (err) {
    console.error('❌ Error fetching yesterday’s transactions:', err.message);
    return [];
  }
}
module.exports = { getYesterdaySpend };


