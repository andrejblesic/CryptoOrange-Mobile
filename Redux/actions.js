const ADD_LATEST_PRICE = 'ADD_LATEST_PRICE';
const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
const ADD_USER_INFO = 'ADD_USER_INFO';

export function addLatestPrice(pair, priceArr) {
  return {
    type: ADD_LATEST_PRICE,
    pair,
    priceArr
  }
}

export function addTransactions(transactions) {
  return {
    type: ADD_TRANSACTIONS,
    transactions
  }
}

export function addUserInfo(userInfo) {
  return {
    type: ADD_USER_INFO,
    userInfo
  }
}
