import {combineReducers} from 'redux';
import getAllTransactions from '../reducer/transactions';

const rootReducer = combineReducers({
  getAllTransactions,
});

export default rootReducer;
