// import React from 'react';
// import {View, StyleSheet, ScrollView, Image} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {Colors} from 'assets/styles/colors';
// import Fonts from 'assets/styles/fonts';
// import Typography from 'components/Text/Typography';
// import PrimaryButton from 'components/buttons/PrimaryButton';
// import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
// import {useMeals} from 'context/MealContext';
// import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
// import {LoadingModal} from 'components/LoadingModal/LoadingModal';
// import ErrorMessage from 'components/Error/BoostrapStyleError';

// type MealDetailProps = {
//   navigation: any;
//   route: any;
// };

// const MealDetailScreen: React.FC<MealDetailProps> = ({route}) => {
//   const {mealId} = route.params;
//   const {meals, loading, error} = useMeals();

//   const meal = meals.find(m => m.id === mealId);

//   if (!meal) {
//     return (
//       <ThemeGradientBackground>
//         <LoadingModal loading={loading} setLoading={() => {}} />
//         {error && <ErrorMessage error={error} onClose={() => {}} />}
//         {!loading && (
//           <View style={styles.container}>
//             <HeaderBackButton title="Meal Detail" />
//             <Typography style={styles.desc}>Meal not found.</Typography>
//           </View>
//         )}
//       </ThemeGradientBackground>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <HeaderBackButton title={meal.title} />

//       {/* Meal Image */}
//       <Image source={meal.image} style={styles.image} />

//       {/* Content */}
//       <ScrollView
//         style={styles.contentWrapper}
//         showsVerticalScrollIndicator={false}>
//         {/* Title */}
//         <Typography style={styles.title}>{meal.title}</Typography>

//         {/* Description */}
//         <Typography style={styles.desc}>{meal.description}</Typography>

//         {/* Ingredients */}
//         <Typography style={styles.sectionTitle}>Ingredients</Typography>
//         <Typography style={styles.desc}>
//           {meal.ingredients || 'No ingredients available.'}
//         </Typography>

//         {/* Nutrition */}
//         <Typography style={styles.sectionTitle}>Nutrition Value</Typography>
//         <View style={styles.nutritionContainer}>
//           {meal.nutritionValues?.length > 0 ? (
//             meal.nutritionValues.map((item: string, idx: number) => (
//               <View key={idx} style={styles.nutritionTag}>
//                 <Typography style={styles.nutritionText}>{item}</Typography>
//               </View>
//             ))
//           ) : (
//             <Typography style={styles.desc}>
//               No nutrition data available.
//             </Typography>
//           )}
//         </View>

//         {/* Button */}
//         <PrimaryButton
//           title="Book Now"
//           onPress={() => console.log('Booking Meal:', meal.title)}
//           style={styles.button}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//      flex: 1,
//     paddingHorizontal: wp('5%'),
//     marginBottom: '20%',
//   },
//   image: {
//     width: '100%',
//     height: hp('30%'),
//     resizeMode: 'cover',
//   },
//   contentWrapper: {
//     backgroundColor: Colors.white,
//     marginTop: -hp('5%'),
//     borderTopLeftRadius: wp('5%'),
//     borderTopRightRadius: wp('5%'),
//     padding: wp('5%'),
//     shadowColor: Colors.black,
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: {width: 0, height: -3},
//     elevation: 3,
//   },
//   title: {
//     fontSize: wp('5%'),
//     fontFamily: Fonts.Urbanist.bold,
//     color: Colors.black,
//     marginBottom: hp('1%'),
//   },
//   desc: {
//     fontSize: wp('3.8%'),
//     fontFamily: Fonts.Urbanist.regular,
//     color: Colors.bodyText,
//     marginBottom: hp('2%'),
//     lineHeight: hp('2.5%'),
//   },
//   sectionTitle: {
//     fontSize: wp('4.2%'),
//     fontFamily: Fonts.Urbanist.bold,
//     color: Colors.black,
//     marginTop: hp('2%'),
//     marginBottom: hp('1%'),
//   },
//   nutritionContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: hp('2%'),
//   },
//   nutritionTag: {
//     backgroundColor: Colors.lightRed,
//     paddingVertical: hp('0.6%'),
//     paddingHorizontal: wp('3%'),
//     borderRadius: wp('2%'),
//     marginRight: wp('2%'),
//     marginBottom: hp('1%'),
//   },
//   nutritionText: {
//     fontSize: wp('3.4%'),
//     fontFamily: Fonts.Urbanist.medium,
//     color: Colors.primaryOrange,
//   },
//   button: {
//     width: '100%',
//     marginTop: hp('2%'),
//   },
// });

// export default MealDetailScreen;

// import 'react-native-reanimated';

import React, { useMemo, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { BottomSheetScrollView, BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from 'assets/styles/colors';
import Fonts from 'assets/styles/fonts';
import Typography from 'components/Text/Typography';
import PrimaryButton from 'components/buttons/PrimaryButton';
import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
import { useMeals } from 'context/MealContext';

type MealDetailProps = {
  navigation: any;
  route: any;
};

const MealDetailScreen: React.FC<MealDetailProps> = ({ route }) => {
  const { mealId } = route.params;
  const { meals } = useMeals();

  const meal = meals.find(m => m.id === mealId);

  // bottom sheet ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // snap points
  const snapPoints = useMemo(() => ['35%', '85%'], []);

  if (!meal) {
    return (
      <View style={styles.container}>
        <HeaderBackButton title="Meal Detail" />
        <Typography>Meal not found</Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderBackButton title={meal.title} />

      {/* Image */}
      <Image source={meal.image} style={styles.image} />

      {/* Title + Short Desc always visible */}
      <View style={styles.introBox}>
        <Typography style={styles.title}>{meal.title}</Typography>
        <Typography
          style={styles.desc}
          numberOfLines={3}
        >
          {meal.description}
        </Typography>
      </View>

      {/* Bottom Sheet */}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handle}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Ingredients */}
          <Typography style={styles.sectionTitle}>Ingredients</Typography>
          <Typography style={styles.desc}>
            {meal.ingredients || 'No ingredients available.'}
          </Typography>

          {/* Nutrition */}
          <Typography style={styles.sectionTitle}>Nutrition Value</Typography>
          <View style={styles.nutritionContainer}>
            {meal.nutritionValues?.map((item: string, idx: number) => (
              <View key={idx} style={styles.nutritionTag}>
                <Typography style={styles.nutritionText}>{item}</Typography>
              </View>
            ))}
          </View>

          {/* Button */}
          <PrimaryButton
            title="Book Now"
            onPress={() => console.log('Booking Meal:', meal.title)}
            style={styles.button}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
    paddingHorizontal: wp('5%'),
    marginBottom: '20%',
  },
  image: {
    width: '100%',
    height: hp('30%'),
    resizeMode: 'cover',
  },
  introBox: {
    padding: wp('5%'),
  },
  title: {
    fontSize: wp('5%'),
    fontFamily: Fonts.Urbanist.bold,
    color: Colors.black,
  },
  desc: {
    fontSize: wp('3.8%'),
    fontFamily: Fonts.Urbanist.regular,
    color: Colors.bodyText,
    marginTop: hp('1%'),
  },
  sheetBackground: {
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    backgroundColor: Colors.white,
  },
  handle: {
    backgroundColor: Colors.Storke,
    width: wp('12%'),
  },
  sheetContent: {
    padding: wp('5%'),
  },
  sectionTitle: {
    fontSize: wp('4.2%'),
    fontFamily: Fonts.Urbanist.bold,
    color: Colors.black,
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  nutritionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('2%'),
  },
  nutritionTag: {
    backgroundColor: Colors.lightRed,
    paddingVertical: hp('0.6%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
  },
  nutritionText: {
    fontSize: wp('3.4%'),
    fontFamily: Fonts.Urbanist.medium,
    color: Colors.primaryOrange,
  },
  button: {
    marginTop: hp('2%'),
    width: '100%',
  },
});

export default MealDetailScreen;
