import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  GestureResponderEvent,
} from 'react-native';
import {useAuth} from 'context/AuthContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NotificationBell, RightIcon} from 'styles/svg-icons';
import {SvgXml} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const items = [
  {
    id: '1',
    name: 'Notifications',
    routeName: 'NotificationsSettings',
    routeParams: null,
    NotificationBell,
    icon: NotificationBell,
  },
  {
    id: '2',
    name: 'Offers & Coupons',
    routeName: 'offers',
    routeParams: null,
    icon: NotificationBell,
  },
  {
    id: '3',
    name: 'History',
    routeName: 'NotFound',
    routeParams: {
      title: 'History',
      message: 'This feature is not available yet',
    },
    icon: NotificationBell,
  },
  {
    id: '4',
    name: 'Payments',
    routeName: 'offers',
    routeParams: null,
    icon: NotificationBell,
  },
  {
    id: '5',
    name: 'About Us',
    routeName: 'AboutUs',
    icon: NotificationBell,
  },

  {
    id: '6',
    name: 'FAQ’s',
    routeName: 'AboutUs',
    icon: NotificationBell,
  },

  {
    id: '7',
    name: 'T&C, Privacy Policy',
    routeName: 'TermsAndConditions',
    routeParams: null,
    icon: NotificationBell,
  },

  {
    id: '8',
    name: ' Help Center',
    routeName: 'TermsAndConditions',
    routeParams: null,
    icon: NotificationBell,
  },
];

const SupportItems = [
  {
    id: '1',
    name: 'Log out',
    routeName: 'LogOut',
    icon: NotificationBell,
  },
];

const SettingsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const userName = 'Sathya Krishnan';
  const profileImage = 'https://example.com/profile.jpg';
  const {logout} = useAuth();

  const handleSignOut = async () => {
    console.log('logoutpress');

    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  const openPage = (routeName: string, routeParams: any) => {
    if (routeParams) {
      navigation.navigate(routeName, routeParams);
    } else {
      navigation.navigate(routeName);
    }
  };

  function EditProfile(): void {
    navigation.navigate('EditProfile');
  }

  return (
    <LinearGradient
      colors={['#FF651429', '#4AB23814', '#FAFAFA00']}
      start={{x: 0.1, y: 0}}
      end={{x: 0.1, y: 1}}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.mainScrollContainer}
        keyboardShouldPersistTaps="handled">
        {/* -------------------------------------------- Main Container  ------------------------------------------- */}

        <View style={styles.mainContainer}>
          {/* --------------------------------------------Account Item Container  ------------------------------------------- */}

          <TouchableOpacity style={styles.card} onPress={EditProfile}>
            <Image source={{uri: profileImage}} style={styles.image} />
            <View style={styles.textSection}>
              <Text style={styles.name}>{userName}</Text>
              <Text style={styles.subtitle}>Edit Profile</Text>
            </View>
            <SvgXml xml={RightIcon} width={14} height={14} />
          </TouchableOpacity>
          <View style={styles.ItemContainer}>
            {items.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => openPage(item.routeName, item.routeParams)}>
                <View style={styles.itemContent}>
                  {item.icon && (
                    <SvgXml xml={item.icon} style={styles.itemImage} />
                  )}

                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* --------------------------------------------Actions  Container  ------------------------------------------- */}

          <View style={styles.ItemContainer}>
            {SupportItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={handleSignOut}>
                <View style={styles.itemContent}>
                  {item.icon && (
                    <SvgXml xml={item.icon} style={styles.itemImage} />
                  )}

                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('1%'),
    paddingTop: hp('2%'),
  },
  mainScrollContainer: {
    flexGrow: 1,
  },
  mainContainer: {
    padding: wp('5%'),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6514',
    borderRadius: 12,
    padding: wp('3%'),
    marginVertical: 10,
    shadowColor: '#000',
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: wp('3%'),
  },
  textSection: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Urbanist-Regular',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginVertical: hp(0.9),
  },
  ItemContainer: {
    marginBottom: hp(2),
    backgroundColor: '#ffff',
    padding: wp('3%'),
    borderRadius: 10,
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
