import {
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_SUCCESS,
  TRANSACTIONS_ERROR,
} from '../../action/types';

const initialState = {
  apiCalling: false,
  apiCallSuccess: false,
  apiCallError: false,
  transactionInfo: [],
};

const getAllTransactions = (
  state = initialState,
  action = {type: '', payload: null},
) => {
  const {type, payload} = action;

  switch (type) {
    case TRANSACTIONS_REQUEST:
      return {
        ...state,
        apiCalling: true,
        apiCallSuccess: false,
        apiCallError: false,
      };
    case TRANSACTIONS_SUCCESS:
      return {
        ...state,
        apiCalling: false,
        apiCallSuccess: true,
        transactionInfo: payload.transactionInfo.transactionInfo,
        apiCallError: false,
      };

    case TRANSACTIONS_ERROR:
      return {
        ...state,
        apiCalling: false,
        apiCallSuccess: false,
        apiCallError: true,
      };

    default:
      return state;
  }
};

export default getAllTransactions;
