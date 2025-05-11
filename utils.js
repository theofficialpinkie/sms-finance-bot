function getYesterdayDate() {
    const now = new Date();                  // right now
    now.setDate(now.getDate() - 1);          // go back 1 day
    return now.toISOString().split('T')[0];  // format like "2025-05-01"
  }
  
  module.exports = { getYesterdayDate };