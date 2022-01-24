import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

interface Props {
  name: string;
  icon: string;
  currency: string;
  created_at: string;
  carbon_footprint: number;
  amount: number;
}

const Card: React.FC<Props> = ({
  name,
  icon,
  currency,
  amount,
  created_at,
  carbon_footprint,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: icon}} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subTitle}>
          {amount} {currency}
        </Text>
        <Text style={styles.subTitle}>{created_at}</Text>
        <Text style={styles.subTitle}>{carbon_footprint}</Text>
      </View>
    </View>
  );
};

export default Card;
