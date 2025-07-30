import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SortButtons from './Components/SortButtons';
import OrderCard from './Components/OrderCard';

const mockOrders = [
  {
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: "Sanjay's Lunch Plan",
    dateTime: '01/05/2025 (Monday), 12:30 PM',
    food: 'Veg Noodles and Gravy',
    status: 'Delivered',
  },
  {
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: "Sanjay's Lunch Plan",
    dateTime: '01/05/2025 (Monday), 12:30 PM',
    food: 'Aloo Paratha',
    status: 'Delivered',
  },
];

const OrderHistoryScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sort your Orders by</Text>
      <SortButtons />
      {mockOrders.map((item, index) => (
        <OrderCard key={index} data={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
    color: '#333',
  },
});

export default OrderHistoryScreen;
