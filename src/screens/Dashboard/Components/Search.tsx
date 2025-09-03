import { Colors } from 'assets/styles/colors';
import Fonts from 'assets/styles/fonts';
import { View, TextInput, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SearchIcon } from 'styles/svg-icons';

const SearchBar = ({ value, onChangeText }: { value: string; onChangeText: (text: string) => void }) => {
  return (
    <View style={styles.container}>
      <SvgXml xml={SearchIcon} style={styles.icon} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={Colors.bodyText} 
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: '1%',
    marginTop: '2%',
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.Urbanist.regular
  },
  icon: {},
});

export default SearchBar;
