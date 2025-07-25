import React from 'react';
import {Text, StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Calender, Helthy, irrattaiilai, MultiCusine} from 'styles/svg-icons';

const mockCardData = [
  {
    id: '1',
    title: 'Healthy',
    description: 'Relax and stretch your muscles.',
    icon: Helthy,
    color: '#FFEBEE',
  },
  {
    id: '2',
    title: 'Diet Plan',
    description: 'Eat healthy, stay healthy.',
    icon: irrattaiilai,
    color: '#E8F5E9',
  },
  {
    id: '3',
    title: 'Flexible Plans',
    description: 'Drink 8+ glasses daily.',
    icon: Calender,
    color: '#E3F2FD',
  },
  {
    id: '4',
    title: 'Sleep Tracker',
    description: 'Track your sleep schedule.',
    icon: MultiCusine,
    color: '#F3E5F5',
  },
];

const Highlights = () => {
  const handleCardPress = (item: any) => {
    console.log('Card pressed:', item.title);
  };

  const renderCard = ({item}: {item: any}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleCardPress(item)}
      style={[styles.card, {backgroundColor: item.color}]}>
      <SvgXml
        xml={item.icon}
        width={wp('15%')}
        height={wp('15%')}
        style={styles.icon}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={mockCardData}
      numColumns={2}
      renderItem={renderCard}
      keyExtractor={item => item.id}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
};

export default Highlights;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('3%'),
    paddingTop: hp('2%'),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  card: {
    width: wp('44%'),
    padding: wp('3.5%'),
    borderRadius: wp('3%'),
    elevation: 1,
    alignItems: 'flex-start',
    
  },
  icon: {
    marginBottom: hp('1.2%'),
  },
  title: {
    fontSize: wp('5.8%'),
    fontWeight: '600',
    marginBottom: hp('0.3%'),
    color: '#222',
    width:90,
    fontFamily:'Urbanist-Bold'
  },
  description: {
    fontSize: wp('3.2%'),
    color: '#555',
    fontFamily:'OpenSans-Regular'
  },
});
