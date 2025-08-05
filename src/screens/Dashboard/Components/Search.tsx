import { View, TextInput, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SearchIcon } from 'styles/svg-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <SvgXml xml={SearchIcon} style={styles.icon} />
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: '1%',
    marginTop: '2%'

  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Urbanist-Regular'
  },
  icon: {},
});

export default SearchBar;
