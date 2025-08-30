import React, {useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import PrimaryFieldLabel from 'components/inputs/FieldLabel';
import ThemeInputPrimary from 'components/inputs/ThemeInputPrimary';
import PrimaryButton from 'components/buttons/PrimaryButton';
import styles from '../../Components/forms/Styles/styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PrimaryTextArea from 'components/inputs/TextArea';

export default function ParentDetails({
  fatherFullName,
  setFatherFullName,
  motherFullName,
  setMotherFullName,
  mobileNumber,
  setMobileNumber,
  address,
  setAddress,
  submitRegistration,
  errors,
}: any) {
  const isFormValid = useMemo(() => {
    return (
      fatherFullName?.trim() &&
      motherFullName?.trim() &&
      mobileNumber?.trim() &&
      address?.trim()
    );
  }, [fatherFullName, motherFullName, mobileNumber, address]);
  return (
    <View style={styles.parentFormContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('15%')}}>
        <PrimaryFieldLabel label="Father’s Full Name" required />
        <ThemeInputPrimary
          value={fatherFullName}
          onChangeText={setFatherFullName}
          placeholder="Father's Full Name"
          error={errors?.fatherFullName}
        />

        <PrimaryFieldLabel label="Mother’s Full Name" required />
        <ThemeInputPrimary
          value={motherFullName}
          onChangeText={setMotherFullName}
          placeholder="Mother's Full Name"
          error={errors?.motherFullName}
        />

        <PrimaryFieldLabel label="Mobile Number" required />
        <ThemeInputPrimary
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Mobile Number"
          error={errors?.mobileNumber}
        />

        <PrimaryFieldLabel label="Residential Address" required />
        <PrimaryTextArea
          value={address}
          onChangeText={setAddress}
          placeholder="Residential Address"
          error={errors?.address}
          multiline
          numberOfLines={4}
        />
        
      </ScrollView>
      <View style={styles.SubmitButtonContainer}>
        <PrimaryButton
          title="Next"
          onPress={submitRegistration}
          disabled={!isFormValid}       
        />
      </View>
    </View>
  );
}
