import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PromoSlider from '../components/PromoSlider';
import FreeTrialCard from '../components/FreeTrialCard';
import HighlightCards from '../components/HighlightCards';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header userName="Sathya" />
        <SearchBar />
        <PromoSlider />
        <FreeTrialCard />
        <HighlightCards />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
