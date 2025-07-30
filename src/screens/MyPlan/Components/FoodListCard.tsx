import NoDataMessage from 'components/Error/NoDataMessage';
import AutoShrinkText from 'components/Text/AutoShrinkText';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { EditIcon } from 'styles/svg-icons';

interface FoodItem {
  date: string;
  food: string;
}

interface Props {
  childName: string;
  dateRange: string;
  list: FoodItem[];
}

const FoodListCard: React.FC<Props> = ({childName, dateRange, list}) => {
  const renderItem = ({item}: {item: FoodItem}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <View style={styles.foodCell}>
        <AutoShrinkText style={styles.foodText}>{item.food}</AutoShrinkText>
        <TouchableOpacity>
          <SvgXml xml={EditIcon} width={wp('4%')} height={wp('4%')} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>{childName}</Text>
      <Text style={styles.dateRange}>{dateRange}</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.tableHeader]}>DATE</Text>
          <Text style={[styles.cell, styles.tableHeader]}>FOOD LIST</Text>
        </View>
        <FlatList
          data={list}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
          ListEmptyComponent={<NoDataMessage message="No food items found." />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginVertical: hp('1.5%'),
    elevation: 3,
  },
  header: {
    fontWeight: 'bold',
    fontSize: wp('4.2%'),
    backgroundColor: '#FFE7D8',
    padding: wp('2%'),
    borderRadius: wp('2%'),
  },
  dateRange: {
    marginTop: hp('0.5%'),
    fontSize: wp('3.2%'),
    color: '#444',
  },
  table: {
    marginTop: hp('1.5%'),
  },
  tableHeader: {
    fontSize: wp('3.5%'),
    fontFamily: 'Urbanist-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  cell: {
    fontSize: wp('3.5%'),
    flex: 1,
  },
  foodCell: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: wp('2%'),
  },
  foodText: {
    fontSize: wp('3.5%'),
    flexShrink: 1,
  },
  emptyText: {
    padding: wp('2.5%'),
    fontStyle: 'italic',
    color: '#888',
    fontSize: wp('3.2%'),
  },
});

export default FoodListCard;
