import { createStore } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {latestPrices: {}};

export const addPriceReducer = createReducer(initialState, {
  ADD_LATEST_PRICE: (state, action) => {return {...state, latestPrices: {...state.latestPrices, [action.pair]: action.priceArr}}},
  ADD_TRANSACTIONS: (state, action) => {return {...state, transactions: action.transactions}},
  ADD_USER_INFO: (state, action) => {return {...state, userInfo: action.userInfo}}
});

const store = createStore(addPriceReducer);
export default store;
