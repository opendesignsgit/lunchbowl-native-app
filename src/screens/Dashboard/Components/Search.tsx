import {View, TextInput, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {SearchIcon} from 'styles/svg-icons';

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
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal:14,
    borderRadius: 12,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  icon: {},
});

export default SearchBar;
