import { createStore } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  latestPrices: {},
  transactions: {},
  userInfo: {},
  balances: [],
  transactionTypes: []
};

export const addPriceReducer = createReducer(initialState, {
  ADD_LATEST_PRICE: (state, action) => {return {...state, latestPrices: {...state.latestPrices, [action.pair]: action.priceArr}}},
  ADD_TRANSACTIONS: (state, action) => {return {...state, transactions: action.transactions}},
  ADD_USER_INFO: (state, action) => {return {...state, userInfo: action.userInfo}},
  ADD_USER_BALANCES: (state, action) => {return {...state, balances: action.balances}},
  ADD_TRANSACTION_TYPES: (state, action) => {return {...state, transactionTypes: action.transactionTypes}}
});

const store = createStore(addPriceReducer);
export default store;
