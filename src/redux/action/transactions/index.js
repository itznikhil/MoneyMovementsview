import {TRANSACTIONS_REQUEST} from '../types';

export const getAllTransactions = data => {
  return {
    type: TRANSACTIONS_REQUEST,
    payload: data,
  };
};
