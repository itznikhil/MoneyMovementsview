import React from 'react';
import {render, waitForElement, fireEvent} from 'react-native-testing-library';

import PlainUnconnectedVersion, {
  TransactionRow,
} from '../PlainUnconnectedVersion';

describe('TransactionList', () => {
  test('renders a loading component initially', () => {
    const {getByTestId} = render(<PlainUnconnectedVersion />);
    expect(getByTestId('loading-message'));
  });

  test('render message that no results found if empty array returned', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    const {getByTestId} = render(<PlainUnconnectedVersion />);

    await waitForElement(() => {
      return getByTestId('no-results');
    });

    expect(getByTestId('no-results'));
  });

  test('renders a list of posts', async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          amount: 2195,
          brand_partner: 'FALSE',
          carbon_footprint: 25,
          category: 'education',
          created_at: '2021-04-22 02:15',
          currency: 'GBP',
          fees: 0,
          icon: 'https://novus-app-styleguide.s3.eu-west-1.amazonaws.com/banking_icons/education_small.svg',
          id: 1,
          name: 'Tuition Fees',
          status: 'completed',
          type: 'card',
        },
        {
          amount: 15,
          brand_partner: 'FALSE',
          carbon_footprint: 60,
          category: 'groceries',
          created_at: '2020-09-30 19:43',
          currency: 'GBP',
          fees: 0,
          icon: 'https://novus-app-styleguide.s3.eu-west-1.amazonaws.com/banking_icons/groceries_small.svg',
          id: 2,
          name: 'Waterstones',
          status: 'completed',
          type: 'card',
        },
      ]),
    );
    const {queryByTestId, getByTestId} = render(<PlainUnconnectedVersion />);

    expect(queryByTestId('transaction-row-0')).toBeNull();

    await waitForElement(() => {
      return queryByTestId('transaction-row-0');
    });

    expect(getByTestId('transaction-row-0'));
  });

  test('render error message if error thrown from api', async () => {
    fetch.mockRejectOnce(new Error('An error occurred.'));
    const {getByTestId, toJSON, getByText} = render(
      <PlainUnconnectedVersion />,
    );

    await waitForElement(() => {
      return getByTestId('error-message');
    });

    expect(getByText('An error occurred.'));
  });
});

describe('TransactionRow', () => {
  test('is tappable', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <TransactionRow
        index={0}
        item={{name: 'Tuition Fees'}}
        onPress={onPress}
      />,
    );

    fireEvent.press(getByText('Tuition Fees'));
    expect(onPress).toHaveBeenCalled();
  });
});
