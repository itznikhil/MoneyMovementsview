import {takeLatest, call, put} from 'redux-saga/effects';
import {
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_SUCCESS,
  TRANSACTIONS_ERROR,
} from '../../../redux/action/types';

import {makeNetworkCall} from '../../index';
import {responseCode, apiEndPoints} from '../../../utility/api';

function getTransactionsListAPI(action) {
  const {GETLISTOFTRANSACTIONS_URL} = apiEndPoints;
  const config = {
    method: 'get',
    url: GETLISTOFTRANSACTIONS_URL,
  };

  return makeNetworkCall(config);
}

function* getTransactionsList(action) {
  try {
    const response = yield call(getTransactionsListAPI, action);
    if (response.status === responseCode.API_RESPONSE_SUCCESS) {
      const {data = {}} = response;
      yield put({
        type: TRANSACTIONS_SUCCESS,
        payload: {transactionInfo: data},
      });
    } else {
      yield put({
        type: TRANSACTIONS_ERROR,
        payload: {error: response},
      });
    }
  } catch (error) {
    // if something went wrong (unexpected)
    yield put({type: TRANSACTIONS_ERROR, payload: {error}});
  }
}

export default function* getTransactionsWatcherSaga() {
  yield takeLatest(TRANSACTIONS_REQUEST, getTransactionsList);
}
