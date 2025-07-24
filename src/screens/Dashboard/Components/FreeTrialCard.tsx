import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FreeTrialCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Kick Start your Free Trial</Text>
      <Text style={styles.desc}>Delicious and nutritious food that meets the dietary needs of growing children.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>GET FREE TRIAL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF6F0',
    borderRadius: 12,
    borderRightWidth: 4,
    borderColor: '#F37520',
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  desc: { marginVertical: 8, fontSize: 14 },
  button: {
    backgroundColor: '#F37520',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
