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

async function getMonthlySpend () {

try {
const now = new Date();
const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const start_date = firstOfMonth.toISOString().split('T')[0];
const end_date = now.toISOString().split('T')[0];

   const response = await client.transactionsGet({
  access_token: process.env.PLAID_ACCESS_TOKEN,
  start_date,
  end_date,
  options: { count: 100, offset: 0 }, // increased count to 100
});

const transactions = response.data.transactions;

const total = transactions.reduce((sum, txn) => sum + txn.amount, 0).toFixed(2);

return {
  total,
  transactions,
};

} catch (err) {
console.error('❌ Error fetching monthly spend:', err.message);
return {
total: '0.00',
transactions: [],
};

}

}


module.exports = { getYesterdaySpend, getBalances, getMonthlySpend, };



