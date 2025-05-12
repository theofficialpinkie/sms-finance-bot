function getYesterdayDate() {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    return now.toISOString().split('T')[0];
  }
  
  function formatSpend(transactions) {
    if (transactions.length === 0) {
      return "Yesterday’s Spend: $0.00\n- No transactions";
    }
  
    const total = transactions.reduce((sum, txn) => sum + parseFloat(txn.amount), 0).toFixed(2);
    const lines = transactions.map(txn => `- ${txn.name}: $${txn.amount}`);
  
    return `Yesterday’s Spend: $${total}\n` + lines.join('\n');
  }
  
  function formatBalances(balances) {
    const filtered = balances.filter(account =>
      ['checking', 'savings', 'credit card'].includes(account.subtype)
    );
  
    let lines = [];
    let creditCardTotal = 0;
  
    filtered.forEach(account => {
      const amount = account.current?.toFixed(2) || '0.00';
  
      if (account.subtype === 'credit card') {
        creditCardTotal += parseFloat(account.current || 0);
      } else {
        const label = account.subtype.charAt(0).toUpperCase() + account.subtype.slice(1);
        lines.push(`${label}: $${amount}`);
      }
    });
  
    if (creditCardTotal !== 0) {
      lines.push(`Credit Card Total: $${creditCardTotal.toFixed(2)}`);
    }
  
    return lines.join('\n');
  }
  
  module.exports = { getYesterdayDate, formatSpend, formatBalances };