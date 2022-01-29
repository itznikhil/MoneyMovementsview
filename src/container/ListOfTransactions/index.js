import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as transactionsAction from '../../redux/action/transactions';
import styles from './styles';
import {Loader} from '../../component';
import {strings} from '../../../locales/i18n';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.apiCallSuccess) {
      return {
        transactions: props.transactionInfo.transactionInfo,
      };
    }
    if (props.transactionInfo.transactionInfo !== state.transactions) {
      return {
        transactions: props.transactionInfo.transactionInfo,
      };
    }
    return null;
  }
  componentDidMount() {
    const {getAllTransactions} = this.props;
    getAllTransactions();
  }
  render() {
    const {transactions} = this.state;
    const {apiCalling} = this.props;
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
          data={transactions}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DetailsOfTransactions', {
                  name: item.name,
                  amount: item.amount,
                  currency: item.currency,
                  icon: item.icon,
                  created_at: item.created_at,
                  carbon_footprint: item.carbon_footprint,
                })
              }>
              <View style={[styles.headerView, {padding: 5}]}>
                <View style={{flex: 3}}>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.text}>{item.amount}</Text>
                  <Text style={styles.text}>{item.currency}</Text>
                </View>
                <View style={{flex: 2}}>
                  <Image
                    source={{uri: item.icon}}
                    style={{width: 50, height: 50}}
                  />
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
          )}
        />
        <Loader loading={apiCalling} />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(transactionsAction, dispatch);
};

const mapStateToProps = state => ({
  apiCalling: state.getAllTransactions.apiCalling,
  apiCallSuccess: state.getAllTransactions.apiCallSuccess,
  apiCallError: state.getAllTransactions.apiCallError,
  transactionInfo: state.getAllTransactions.transactionInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
