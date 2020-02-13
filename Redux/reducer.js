import { createStore } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {latestPrices: {}};

export const addPriceReducer = createReducer(initialState, {
  ADD_LATEST_PRICE: (state, action) => {return {...state, latestPrices: {...state.latestPrices, [action.pair]: action.priceArr}}}
});

const store = createStore(addPriceReducer);
export default store;
