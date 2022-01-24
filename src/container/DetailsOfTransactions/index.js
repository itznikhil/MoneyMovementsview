import React, {Component} from 'react';
import {View} from 'react-native';
import {Card} from '../../component';
import styles from '../../utility/styleHelper';

export default class DetailsOfTransactions extends Component {
  state = {
    /** Use all of previous screen values */
    name: this.props.navigation.getParam('name'),
    currency: this.props.navigation.getParam('currency'),
    amount: this.props.navigation.getParam('amount'),
    icon: this.props.navigation.getParam('icon'),
    created_at: this.props.navigation.getParam('created_at'),
    carbon_footprint: this.props.navigation.getParam('carbon_footprint'),
  };

  render() {
    const {name, icon, currency, amount, created_at, carbon_footprint} =
      this.state;
    return (
      <View style={styles.sectionCentered}>
        <Card
          name={name}
          icon={icon}
          currency={currency}
          amount={amount}
          created_at={created_at}
          carbon_footprint={carbon_footprint}
        />
      </View>
    );
  }
}
