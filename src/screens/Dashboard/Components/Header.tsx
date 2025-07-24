
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BellIcon, DefultProfilePic} from 'styles/svg-icons';

export default function Header({userName}: {userName: string}) {
  return (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text
          style={styles.greeting}
          numberOfLines={1}
          ellipsizeMode="tail"
          adjustsFontSizeToFit
        >
          Hello, {userName}!
        </Text>
        <Text style={styles.subtitle}>Welcome to Lunch Bowl</Text>
      </View>
      <View style={styles.rightIcons}>
        <TouchableOpacity>
          <SvgXml xml={BellIcon} style={styles.icon} />
        </TouchableOpacity>
        <SvgXml xml={DefultProfilePic} style={styles.profile} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  textSection: {
    flex: 1,
    paddingRight: 10, // space to avoid text overlapping with icons
  },
  greeting: {
    fontSize: 37,
    color: '#F37520',
    fontFamily: 'Urbanist-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Urbanist-SemiBold',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  profile: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
