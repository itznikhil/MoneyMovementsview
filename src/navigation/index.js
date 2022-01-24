import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ListOfTransactions, DetailsOfTransactions} from '../container';

const MainNavigator = createStackNavigator({
  ListOfTransactions: {screen: ListOfTransactions},
  DetailsOfTransactions: {screen: DetailsOfTransactions},
});

const Nav = createAppContainer(MainNavigator);

export default Nav;
