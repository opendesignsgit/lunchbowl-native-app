import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const MainScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      <LinearGradient
        colors={['#EEEEEE', '#EEEEEE']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.divider}
      />
      <View style={styles.centeredView}>
        <Text style={styles.workInProgressText}>Work in Progress</Text>
      </View>
    </ScrollView>
  );
};

const height = hp('100%');
const width = wp('100%');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginVertical: height * 0.015,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height - 100,
  },
  workInProgressText: {
    fontSize: 18,
    color: 'grey',
  },
});

export default MainScreen;
