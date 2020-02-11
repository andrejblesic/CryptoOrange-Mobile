import { createStore } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
export const ADD_LATEST_PRICE = 'ADD_LATEST_PRICE';

export function addLatestPrice(pair, priceArr) {
  return {
    type: ADD_LATEST_PRICE,
    pair,
    priceArr
  }
}

const initialState = {latestPrices: {}};

// export function addPriceReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_LATEST_PRICE:
//       return {...state, latestPrices: {...state.latestPrices, [action.pair]: action.price}}
//     default:
//       return state;
//   }
// }

export const addPriceReducer = createReducer(initialState, {
  ADD_LATEST_PRICE: (state, action) => {return {...state, latestPrices: {...state.latestPrices, [action.pair]: action.priceArr}}}
});

const store = createStore(addPriceReducer);
export default store;
