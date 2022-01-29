import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import {Loader} from '../../component';
import {strings} from '../../../locales/i18n';
import {api} from '../../util/api';

export const TransactionRow = ({item, index, onPress}) => (
  <TouchableOpacity onPress={onPress} testID={`transaction-row-${index}`}>
    <View style={[styles.headerView, {padding: 5}]}>
      <View style={{flex: 3}}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View style={{flex: 2}}>
        <Text style={styles.text}>{item.amount}</Text>
        <Text style={styles.text}>{item.currency}</Text>
      </View>
      <View style={{flex: 2}}>
        <Image source={{uri: item.icon}} style={{width: 50, height: 50}} />
      </View>
      <View style={{flex: 2}}>
        <Text style={styles.text}>{item.created_at}</Text>
      </View>

      <View style={{flex: 2}}>
        <Text style={styles.text}>{item.carbon_footprint}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.navButton} />
      </View>
    </View>
    <View style={styles.hr} />
  </TouchableOpacity>
);

class PlainUnconnectedVersion extends Component {
  state = {
    transactions: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.getAllTransactions();
  }

  getAllTransactions = () => {
    api('/moneymovements')
      .then(transactions => {
        this.setState({transactions, loading: false, error: null});
      })
      .catch(error => {
        this.setState({loading: false, error: error.message});
      });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* Header View */}

        <View style={styles.headerView}>
          <View style={styles.headingTitleContainer}>
            <Text style={styles.headingText}>{strings('name')}</Text>
          </View>
          <View style={styles.headingTitleContainer}>
            <Text style={styles.headingText}>{strings('amount')}</Text>
          </View>
          <View style={styles.headingTitleContainer}>
            <Text style={styles.headingText}>{strings('icon')}</Text>
          </View>
          <View style={styles.headingTitleContainer}>
            <Text style={styles.headingText}>{strings('creation date')}</Text>
          </View>
          <View style={styles.headingTitleContainer}>
            <Text style={styles.headingText}>
              {strings('carbon footprint')}
            </Text>
          </View>
          {/* For very left space */}

          <View style={{flex: 1}} />
        </View>

        {/*  List of transactions  */}
        <FlatList
          testID="transaction-list"
          data={this.state.transactions}
          renderItem={({item, index}) => (
            <TransactionRow
              item={item}
              onPress={() =>
                this.props.navigation.navigate('DetailsOfTransactions', {
                  name: item.name,
                  amount: item.amount,
                  currency: item.currency,
                  icon: item.icon,
                  created_at: item.created_at,
                  carbon_footprint: item.carbon_footprint,
                })
              }
              index={index}
            />
          )}
          ListEmptyComponent={() => {
            if (this.state.loading) {
              return (
                <Loader loading={this.state.loading} testID="loading-message" />
              );
            }

            if (this.state.error) {
              return <Text testID="error-message">{this.state.error}</Text>;
            }
            return <Text testID="no-results">Sorry, no results found.</Text>;
          }}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}
export default PlainUnconnectedVersion;
