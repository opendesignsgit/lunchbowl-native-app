import { View, TextInput, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      {/* <Ionicons name="search" size={20} color="#999" /> */}
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderRadius: 12,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
