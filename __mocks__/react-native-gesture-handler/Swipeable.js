import React from 'react';
const RN = require('react-native');

class Swipeable extends React.Component {
  render() {
    return <RN.View>{this.props.children}</RN.View>;
  }
}
export default Swipeable;
