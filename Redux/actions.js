const ADD_LATEST_PRICE = 'ADD_LATEST_PRICE';

export function addLatestPrice(pair, priceArr) {
  return {
    type: ADD_LATEST_PRICE,
    pair,
    priceArr
  }
}
