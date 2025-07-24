import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PromoBanner = () => {
  return (
    <View style={styles.banner}>
      <Image
        source={require('../assets/banner.jpg')} // Use the image you used in design
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.subscribeBtn}>
        <Text style={styles.btnText}>SUBSCRIBE NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 16,
    marginBottom: 20,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  subscribeBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF7A00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default PromoBanner;
