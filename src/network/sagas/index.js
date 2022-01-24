import {all} from 'redux-saga/effects';

import getTransactionsWatcherSaga from './transactions';

export default function* rootSaga() {
  yield all([getTransactionsWatcherSaga()]);
}
