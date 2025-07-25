import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {useAuth} from 'context/AuthContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/* --------------------------------------------Main Items   ------------------------------------------- */

const items = [
  {
    id: '1',
    name: 'Edit profile',
    routeName: 'EditProfile',
    routeParams: null,
    // image: notificationImage,
  },
  {
    id: '2',
    name: 'Notifications',
    routeName: 'NotificationsSettings',
    routeParams: null,
    image: require('assets/icons/Settings/Notifications.png'),
  },
  {
    id: '3',
    name: 'Privacy',
    routeName: 'PrivacySettings',
    routeParams: null,
    image: require('assets/icons/Settings/Privacy.png'),
  },
  {
    id: '4',
    name: 'Password and security',
    routeName: 'ChangePassword',
    routeParams: null,
    image: require('assets/icons/Settings/PasswordAndSecurity.png'),
  },
  {
    id: '5',
    name: 'Personal Details',
    routeName: 'NotFound',
    routeParams: {
      title: 'Personal Details',
      message: 'This feature is not available yet',
    },
    image: require('assets/icons/Settings/PersonalDetails.png'),
  },
];
const actionItems = [
  {
    id: '1',
    name: 'About Us',
    routeName: 'AboutUs',
    image: require('assets/icons/Settings/Help.png'),
  },
  {
    id: '2',
    name: 'Terms and Policies',
    routeName: 'TermsAndConditions',
    routeParams: null,
    image: require('assets/icons/Settings/TermsAndConditions.png'),
  },
];
const SupportItems = [
  {
    id: '1',
    name: 'Report a problem',
    routeName: 'NotFound',
    routeParams: {
      title: 'Report a problem',
      message: 'This feature is not available yet',
    },
    image: require('assets/icons/Settings/Report.png'),
  },
  {
    id: '3',
    name: 'Log out',
    routeName: 'LogOut',
    image: require('assets/icons/Settings/LogOut.png'),
  },
];

const SettingsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {logout} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = async () => {
    await logout();
    setModalVisible(false);
  };

  const openPage = (routeName: string, routeParams: any) => {
    if (routeParams) {
      navigation.navigate(routeName, routeParams);
    } else {
      navigation.navigate(routeName);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainScrollContainer}
      keyboardShouldPersistTaps="handled">
   

      {/* -------------------------------------------- Main Container  ------------------------------------------- */}

      <View style={styles.mainContainer}>
        {/* --------------------------------------------Account Item Container  ------------------------------------------- */}

        <View style={styles.ItemContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => openPage(item.routeName, item.routeParams)}>
              <View style={styles.itemContent}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* --------------------------------------------Support & About Container  ------------------------------------------- */}

        <View style={styles.ItemContainer}>
          <Text style={styles.sectionTitle}>Support & About</Text>
          {actionItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => {
                if (item.name === 'Log out') {
                  setModalVisible(true);
                } else {
                  navigation.navigate(item.routeName as never);
                }
              }}>
              <View style={styles.itemContent}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* --------------------------------------------Actions  Container  ------------------------------------------- */}

        <View style={styles.ItemContainer}>
          <Text style={styles.sectionTitle}>Actions</Text>
          {SupportItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => {
                if (item.name === 'Log out') {
                  setModalVisible(true);
                } else {
                  navigation.navigate(item.routeName, item.routeParams);
                }
              }}>
              <View style={styles.itemContent}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* -------------------------------------------- Modal section  ------------------------------------------- */}
{/* 
      <BottomConfirmModal
        visible={modalVisible}
        message="Are you sure you want to log out?"
        onConfirm={handleSignOut}
        onCancel={() => setModalVisible(false)}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainScrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffff',
  },
  mainContainer: {
    padding: wp('5%'),
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginVertical: hp(0.9),
  },
  ItemContainer: {
    marginBottom: hp(2),
  },

  sectionTitle: {
    fontSize: wp(5),
    color: '#000000',
    marginBottom: hp(2),
    fontWeight: '700',
  },
  item: {
    paddingVertical: hp(0.2),
    paddingHorizontal: wp(3.75),
    borderRadius: wp(5),
  },
  itemText: {
    fontSize: wp(4),
    color: '#000000',
    fontWeight: '600',
  },
  itemImage: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(4),
  },
});

export default SettingsScreen;
