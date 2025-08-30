import React, {useEffect, useState} from 'react';
import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
import {Text, View} from 'react-native';
import styles from './Components/forms/Styles/styles';
import ParentDetails from './Components/forms/ParentDetails';
import ChildrenDetails from './Components/forms/ChildDetails';
import SubscriptionPlan from './Components/forms/Subscription';
import PaymentOptions from './Components/forms/PaymentOptions';
import InitialsScreen from './Components/InitialScreen';
import {vabourCub} from 'styles/svg-icons';
import PaginationDots from 'components/paginations.tsx/PrimaryPagination';
import RegistrationService from 'services/RegistartionService/registartion';
import {
  validateChildrenDetails,
  validateParentDetails,
} from 'utils/RegisterationValidate';
import {useAuth} from 'context/AuthContext';

type Step = 1 | 2 | 3 | 4;

export default function Registration({navigation}: any) {
  //################# PARENT STATES ####################

  const [fatherFullName, setFatherFullName] = useState('');
  const [motherFullName, setMotherFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const {userId} = useAuth();

  //################# CHILD STATES ######################
  const [children, setChildren] = useState([
    {
      childName: '',
      dob: '',
      school: '',
      location: '',
      lunchTime: '',
      childClass: '',
      section: '',
      allergies: '',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<Step>(1);

  //################# ERROR STATES ######################

  const [parentErrors, setParentErrors] = useState<any>({});
  const [childrenErrors, setChildrenErrors] = useState<any>({});

  //#################### PLAN STATES #####################
  const [selectedPlan, setSelectedPlan] = useState('');
  const nextStep = () =>
    setStep(prev => (prev < 4 ? ((prev + 1) as Step) : prev));

  const prevStep = () =>
    setStep(prev => (prev > 1 ? ((prev - 1) as Step) : prev));

  const handleChildChange = (
    index: number,
    field: string | null,
    value: any,
  ) => {
    setChildren(prev => {
      const newChildren = [...prev];
      if (field === null) {
        newChildren[index] = {...newChildren[index], ...value}; // merge object
      } else {
        newChildren[index] = {...newChildren[index], [field]: value};
      }
      return newChildren;
    });
  };

  //#################### HELPER FUNCTIONS ##################
  const [schools, setSchools] = useState<any[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(false);

  useEffect(() => {
    const loadSchools = async () => {
      setLoadingSchools(true);
      try {
        const response: any = await RegistrationService.getAllSchools();
        if (response) {
          setSchools(response);
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setLoadingSchools(false);
      }
    };

    loadSchools();
  }, []);

  const addChild = () =>
    setChildren([
      ...children,
      {
        childName: '',
        dob: '',
        school: '',
        location: '',
        lunchTime: '',
        childClass: '',
        section: '',
        allergies: '',
      },
    ]);

  const parseDate = (dob: string) => {
    if (!dob) return null;
    if (/^\d{4}-\d{2}-\d{2}/.test(dob)) {
      return new Date(dob).toISOString();
    }
    const parts = dob.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(+year, +month - 1, +day).toISOString();
    }
    return new Date(dob).toISOString();
  };

  const removeChild = (index: number) => {
    const updated = [...children];
    updated.splice(index, 1);
    setChildren(updated);
  };

  //###################### INITILA SCREEN ###################

  if (!showForm) {
    return (
      <InitialsScreen
        navigation={navigation}
        vabourCub={vabourCub}
        onGetStarted={() => {
          setShowForm(true);
          setStep(1);
        }}
      />
    );
  }
  //###################### FORM TITLES #####################
  const formInfo = {
    1: {
      title: 'Parent’s Details',
      description: 'Enter your details to continue.',
    },
    2: {
      title: 'Childrens Details',
      description: 'Enter your details to continue.',
    },
    3: {
      title: 'Subscription Plan',
      description: 'Select your plan to continue.',
    },
    4: {
      title: 'Payment Options',
      description: 'Make a payment to activate your plan.',
    },
  };

  // #################### SUBMIT FUNCTIONS ##################

  const submitParentDetails = async () => {
    const errors = validateParentDetails({
      fatherFullName,
      motherFullName,
      mobileNumber,
      address,
      email: '',
    });

    if (Object.keys(errors).length > 0) {
      setParentErrors(errors);
      return;
    }
    setParentErrors({});

    try {
      const payload = {
        formData: {
          fatherFirstName: fatherFullName.split(' ')[0] || fatherFullName,
          fatherLastName: fatherFullName.split(' ')[1] || '',
          motherFirstName: motherFullName.split(' ')[0] || motherFullName,
          motherLastName: motherFullName.split(' ')[1] || '',
          mobile: mobileNumber,
          address,
          children: [],
          country: '',
          city: '',
          state: ' ',
          pincode: '',
          email: '',
        },
        step: 1,
        path: 'step-Form-ParentDetails',
        _id: userId || '',
      };

      const response: any = await RegistrationService.createParentRegistration(
        payload,
      );

      if (response && response.data) {
        console.log('Parent saved:', response.data);
        nextStep();
      } else {
        console.error('Invalid parent response', response);
      }
    } catch (error) {
      console.error('Error saving parent details:', error);
    }
  };

  const submitChildrenDetails = async () => {
    const errors = validateChildrenDetails(children);
    if (Object.keys(errors).length > 0) {
      setChildrenErrors(errors);
      return;
    }
    setChildrenErrors({});
    try {
      const formattedChildren = children.map(child => {
        const [firstName, ...lastParts] = child.childName.trim().split(' ');

        return {
          childFirstName: firstName || child.childName,
          childLastName: lastParts.join(' ') || '',
          dob: parseDate(child.dob),
          lunchTime: child.lunchTime,
          school: child.school,
          location: child.location,
          childClass: child.childClass,
          section: child.section,
          allergies: child.allergies,
        };
      });

      const payloadChildData = {
        formData: formattedChildren,
        step: 2,
        path: 'step-Form-ChildDetails',
        _id: userId || '',
      };

      console.log('sending child data', payloadChildData);

      const response: any = await RegistrationService.createChildRegistration(
        payloadChildData,
      );

      if (response && response.data) {
        console.log('Children saved:', response.data);
        nextStep();
      } else {
        console.error('Invalid child response', response);
      }
    } catch (error) {
      console.error('Error saving children:', error);
    }
  };

  //###################### FORMS SCREEN ######################

  return (
    <ThemeGradientBackground>
      <HeaderBackButton title="Back" onPress={prevStep} />
      <PaginationDots totalSteps={4} currentStep={step} />
      <View style={styles.formsContainer}>
        {/* -------- Step Title + Description -------- */}
        <View style={styles.pageHeader}>
          <Text style={styles.stepTitle}>{formInfo[step].title}</Text>
          <Text style={styles.stepDescription}>
            {formInfo[step].description}
          </Text>
        </View>

        {step === 1 && (
          <ParentDetails
            fatherFullName={fatherFullName}
            setFatherFullName={setFatherFullName}
            motherFullName={motherFullName}
            setMotherFullName={setMotherFullName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            address={address}
            setAddress={setAddress}
            submitRegistration={submitParentDetails}
            errors={parentErrors}
          />
        )}
        {step === 2 && (
          <ChildrenDetails
            children={children}
            handleChildChange={handleChildChange}
            addChild={addChild}
            removeChild={removeChild}
            prevStep={prevStep}
            nextStep={submitChildrenDetails}
            errors={parentErrors}
            schools={schools}
            loadingSchools={loadingSchools}
          />
        )}
        {step === 3 && (
          <SubscriptionPlan
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            prevStep={prevStep}
            nextStep={nextStep}
            childCount={children.length}
          />
        )}
        {step === 4 && (
          <PaymentOptions prevStep={prevStep} navigation={navigation} />
        )}
      </View>
    </ThemeGradientBackground>
  );
}
