import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {useAuth} from 'context/AuthContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
// import PrimaryInput from 'components/components/Input/primaryInput';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {camaraIcon} from 'styles/svg-icons';
import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
import {ApiResponseModel} from 'src/model/apiResponseModel';
import {UserInterface} from 'src/model/userSchema';
import UserService from 'services/userService';
import IconInput from 'components/inputs/IconInput';

const EditProfileScreen: React.FC<{navigation: any}> = ({navigation}) => {
  //  -------------------------------------------- State variables  -------------------------------------------
  const {user, userId, userRole} = useAuth();
  console.log(userId);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  // ----------------------------------------------  2. UseEffects Hooks -------------------------------------------------- //

  useEffect(() => {
    setLoading(true);
    fetchUserData();
  }, [user]);

  // ----------------------------------------------  Fetch Profile data-------------------------------------------------- //

  const fetchUserData = async () => {
    try {
      // setLoading(true);

      if (userId) {
        const userResponse: ApiResponseModel = await UserService.getUser(
          userId,
        );
        if (userResponse.success && userResponse.data) {
          const userData: UserInterface = userResponse.data;
          console.log('userData', userData);
          setImageUri(userData.profile?.profile_image_url || undefined);
          setFirstName(userData.profile?.firstname || '');
          setLastName(userData.profile?.lastname || '');
          setEmail(userData.email || '');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // setLoading(false);
    }
  };
  // ----------------------------------------------  Form validations -------------------------------------------------- //

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) {
      newErrors.firstName = 'First Name is required.';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last Name is required.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // ----------------------------------------------  Meadia picker -------------------------------------------------- //

  const selectImageFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };
  // ----------------------------------------------  Update User data  -------------------------------------------------- //

  const saveProfile = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      const userDetails: any = {
        userDetails: {
          'profile.firstname': firstName,
          'profile.lastname': lastName,
          'profile.profile_image_url': imageUri,
        },
      };

      if (userDetails && userId) {
        const response = await UserService.updateUserDetails(
          userId,
          userDetails,
        );
        if (response.data.success) {
          setMessage('Your profile has been successfully updated.');
        } else {
          setMessage(response.data.error || 'Failed to update profile');
        }
      } else {
        return;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------- Spin Loader -------------------------------------------------- //

  if (loading) {
    // return <LoadingModal loading={true} setLoading={setLoading} />;
  }

  // ----------------------------------------------  Main Render UI -------------------------------------------------- //

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* -------------------------------------------- Main scroll container  ------------------------------------------- */}

        <ScrollView
          contentContainerStyle={styles.mainScrollContainer}
          keyboardShouldPersistTaps="handled">
          {/* -------------------------------------------- Header  ------------------------------------------- */}

          <HeaderBackButton
            title="Edit Profile"
            onBackPress={() => navigation.goBack()}
          />
          {/* -------------------------------------------- Main container  ------------------------------------------- */}

          <View style={styles.mainContainer}>
            {/* -------------------------------------------- Profile section container  ------------------------------------------- */}

            <View style={styles.profileImageContainer}>
              <Image
                source={
                  imageUri
                    ? {uri: imageUri}
                    : require('assets/images/Settings/UserDefault.png')
                }
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={selectImageFromGallery}>
                <SvgXml xml={camaraIcon} width={30} height={30} />
              </TouchableOpacity>
            </View>
            {/* -------------------------------------------- Main  container  ------------------------------------------- */}
            <View style={styles.mainContainer}>
              {/* -------------------------------------------- Input  container  ------------------------------------------- */}
              <View style={styles.inputContainer}>
                {/* -------------------------------------------- First name   ------------------------------------------- */}

                <Text style={styles.label}>First Name</Text>
                <IconInput
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName} iconXml={''}                />
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
                {/* -------------------------------------------- Last name   ------------------------------------------- */}

                <Text style={styles.label}>Last Name</Text>
                <IconInput
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName} iconXml={''}                />
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
                {/* -------------------------------------------- Email  ------------------------------------------- */}

                <Text style={styles.label}>Email</Text>
                <IconInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail} iconXml={''}                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* -------------------------------------------- Save Button  ------------------------------------------- */}
                <View style={styles.ButtonContainer}>
                  <PrimaryButton
                    title="Save Changes"
                    onPress={saveProfile}
                    style={{height: hp('6%')}}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainScrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffff',
  },
  mainContainer: {
    padding: wp('3%'),
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  profileImage: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
  },
  cameraIcon: {
    position: 'absolute',
    bottom: hp('-1%'),
    right: wp('21%'),
    width: wp('15%'),
    height: wp('10%'),
  },
  inputContainer: {
    marginBottom: hp('2%'),
    gap: hp('0.5%'),
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp('1%'),
  },
  errorText: {
    color: 'red',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
  },
  ButtonContainer: {
    marginTop: hp('2%'),
    height: hp('6%'),
  },
});

export default EditProfileScreen;
