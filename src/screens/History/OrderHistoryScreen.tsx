import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import SortButtons from './Components/SortButtons';
import OrderCard from './Components/OrderCard';
import {Colors} from 'assets/styles/colors';
import Fonts from 'assets/styles/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
import SearchBar from 'screens/Dashboard/Components/Search';
import ToolTipSectionHeader from 'screens/Dashboard/Components/TooltipHeader';
import {questionIcon} from 'styles/svg-icons';

const mockOrders = [
  {
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Featrue Not Rady',
    dateTime: '00/00/0000 (Monday), 00:00 PM',
    food: 'Featrue Not Rady',
    status: 'No Status',
  },
];

const OrderHistoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <HeaderBackButton title="history" />
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          <ToolTipSectionHeader
            title="Select your Food Plan"
            tooltipText="Choose a plan to see your daily meals."
            icon={questionIcon}
          />
          <SortButtons />
          {mockOrders.map((item, index) => (
            <OrderCard key={index} data={item} />
          ))}
        </View>
      </ScrollView>
    </ThemeGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('10%'),
  },
});

export default OrderHistoryScreen;
