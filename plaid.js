require('dotenv').config();
const { getYesterdayDate } = require('./utils');
const plaid = require('plaid');

const client = new plaid.PlaidApi(
  new plaid.Configuration({
    basePath: plaid.PlaidEnvironments.sandbox, // Change to production when needed
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
    const start_date = getYesterdayDate();
    const end_date = getYesterdayDate();

    const response = await client.transactionsGet({
      access_token: process.env.PLAID_ACCESS_TOKEN,
      start_date,
      end_date,
      options: { count: 10, offset: 0 },
    });

    const transactions = response.data.transactions;

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

async function getBalances() {
  try {
    const response = await client.accountsBalanceGet({
      access_token: process.env.PLAID_ACCESS_TOKEN,
    });

    const accounts = response.data.accounts;

    const cleaned = accounts.map(account => ({
      name: account.name,
      type: account.type,
      subtype: account.subtype,
      available: account.balances.available,
      current: account.balances.current,
    }));

    return cleaned;
  } catch (err) {
    console.error('❌ Error fetching balances:', err.message);
    return [];
  }
}

module.exports = { getYesterdaySpend, getBalances };


