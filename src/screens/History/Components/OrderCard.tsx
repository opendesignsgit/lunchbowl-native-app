import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

type OrderData = {
  image: ImageSourcePropType;
  title: string;
  dateTime: string;
  food: string;
  status: string;
};

type OrderCardProps = {
  data: OrderData;
};

const OrderCard: React.FC<OrderCardProps> = ({ data }) => {
  return (
    <View style={styles.card}>
      <Image source={data.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>{data.dateTime}</Text>
        <Text style={styles.food}>{data.food}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{data.status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#E94E1B',
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: '#444',
    marginVertical: 2,
  },
  food: {
    fontSize: 13,
    color: '#111',
  },
  statusContainer: {
    backgroundColor: '#E3F8E6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#30A64A',
    fontWeight: '600',
  },
});

export default OrderCard;
