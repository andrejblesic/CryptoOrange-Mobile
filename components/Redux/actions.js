import { createStore } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
export const ADD_LATEST_PRICE = 'ADD_LATEST_PRICE';

export function addLatestPrice(pair, price) {
  return {
    type: ADD_LATEST_PRICE,
    pair,
    price
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
  ADD_LATEST_PRICE: (state, action) => {return {...state, latestPrices: {...state.latestPrices, [action.pair]: action.price}}}
});

const store = createStore(addPriceReducer);
export default store;
