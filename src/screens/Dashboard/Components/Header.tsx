import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Header({ userName }: { userName: string }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hello, {userName}!</Text>
        <Text style={styles.subtitle}>Welcome to Lunch Bowl</Text>
      </View>
      {/* <View style={styles.rightIcons}>
        <TouchableOpacity>
          <Image source={require('../assets/icons/bell.png')} style={styles.icon} />
        </TouchableOpacity>
        <Image source={require('../assets/icons/profile.png')} style={styles.profile} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#F37520' },
  subtitle: { fontSize: 14, color: '#333' },
  rightIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 24, height: 24, marginRight: 12 },
  profile: { width: 32, height: 32, borderRadius: 16 },
});
