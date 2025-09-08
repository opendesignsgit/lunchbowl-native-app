import CheckBox from '@react-native-community/checkbox';
import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
import PrimaryButton from 'components/buttons/PrimaryButton';
import SecondaryButton from 'components/buttons/SecondaryButton';
import SectionTitle from 'components/Titles/SectionHeading';
import {useAuth} from 'context/AuthContext';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../assets/styles/colors';

import Fonts from 'assets/styles/fonts';
import {useMenu} from 'context/MenuContext';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
import MenuService from 'services/MyPlansApi/MenuService';
import {BackIcon, ForwardIcon, questionIcon} from 'styles/svg-icons';
import menues from '../../services/MenueService/Data/menus.json';
import {useDate} from 'context/calenderContext';

const allMeals = menues.meal_plan.flatMap(day => day.meals);

// ################### HELPER DROPDOWN #############################

const MealsList = ({
  placeholder,
  selectedValue,
  onSelectDish,
}: {
  placeholder: string;
  selectedValue: string;
  onSelectDish: (dish: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)}>
        <Text style={{color: selectedValue ? '#981313ff' : '#999'}}>
          {selectedValue || placeholder}
        </Text>
      </TouchableOpacity>

      {open && (
        <FlatList
          style={styles.list}
          data={allMeals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelectDish(item);
                setOpen(false);
              }}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// ################### MEAL PLANS (Dietitian) #######################

const mealPlans = {
  1: {
    name: 'Meal Plan 1',
    meals: allMeals,
  },
  2: {
    name: 'Meal Plan 2',
    meals: [...allMeals].reverse(),
  },
};

// ################### MAIN SCREEN ##################################

const normalizeDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const MenuSelectionScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const passedDate = route?.params?.selectedDate
    ? normalizeDate(new Date(route.params.selectedDate))
    : normalizeDate(new Date());

  // console.log('passedDate,----------------', passedDate);

  // ################### STATES CALL HOOCKS #########################

  const [selectedTab, setSelectedTab] = useState<'custom' | 'dietitian'>(
    'custom',
  );

  const [loading, setLoading] = useState(false);
  const {childrenData} = useMenu();
  const {userId} = useAuth();
  const [applySameDish, setApplySameDish] = useState(false);

  const [selectedDate, setSelectedDate] = useState(passedDate);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDietitianPlan, setSelectedDietitianPlan] = useState<any>(null);

  const handleDishSelect = (childIndex: number) => (dish: string) => {
    setSelectedDishes(prev => {
      const updated = [...prev];
      updated[childIndex] = dish;
      return updated;
    });
  };

  useEffect(() => {
    setSelectedDishes([]);
  }, [selectedTab]);

  const {holidays} = useDate();

  console.log('this is Holiday', holidays);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };
  const onPrevDate = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };
  const onNextDate = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };
  const onPrevMonth = () => {
    const prev = new Date(selectedMonth);
    prev.setMonth(prev.getMonth() - 1);
    setSelectedMonth(prev);
  };
  const onNextMonth = () => {
    const next = new Date(selectedMonth);
    next.setMonth(next.getMonth() + 1);
    setSelectedMonth(next);
  };

  // Convert passed date to 'YYYY-MM-DD' format
  const selectedDateStr = new Date(route.params.selectedDate)
    .toISOString()
    .split('T')[0];

  const isHoliday = holidays.some(holiday => holiday.date === selectedDateStr);
  

  // ################### HANDLE API CALL #############################

  const SaveMenue = async () => {
    console.log('👉 SaveMenue called');
    setLoading(true);

    try {
      let childrenPayload;

      if (selectedTab === 'custom') {
        // Custom Plan Save
        childrenPayload = {
          _id: '6899c82df8872394d8f40ba3',
          path: 'save-meals',
          data: {
            userId,
            children: childrenData.map((child, childIndex) => {
              return {
                childId: child.id,
                meals: [
                  {
                    mealDate: selectedDate.toISOString(),
                    mealName: selectedDishes[childIndex] || '',
                  },
                ],
              };
            }),
          },
        };
      } else {
        // Dietitian Plan Save
        if (!selectedDietitianPlan) {
          Alert.alert('Error', 'Please select a Dietitian plan before saving');
          setLoading(false);
          return;
        }

        childrenPayload = {
          _id: '6899c82df8872394d8f40ba3',
          path: 'save-meals',
          data: {
            userId,
            children: childrenData.map(child => {
              return {
                childId: child.id,
                meals: selectedDietitianPlan.meals.map((meal: string) => ({
                  mealDate: selectedMonth.toISOString(),
                  mealName: meal,
                })),
              };
            }),
          },
        };
      }

      const response = await MenuService.saveMenuSelection(childrenPayload);

      if (response?.success) {
        Alert.alert('Success', response.message || 'Menu saved successfully!');
      } else {
        Alert.alert('Error', response?.error || 'Failed to save menu');
      }
    } catch (error) {
      console.error('🔥 Save menu error:', error);
      Alert.alert('Error', 'Something went wrong while saving the menu');
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = () => {
    navigation.navigate('PaymentScreen', {
      selectedDate: selectedDate.toISOString(),
    });
  };

  return (
    <ThemeGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <HeaderBackButton title="Back" />
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'custom' && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab('custom')}>
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === 'custom' && styles.activeTabText,
                ]}>
                Custom Plan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'dietitian' && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab('dietitian')}>
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === 'dietitian' && styles.activeTabText,
                ]}>
                Dietitian Plan
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Selector */}

          {selectedTab === 'custom' ? (
            <View style={styles.dateSelector}>
              <TouchableOpacity onPress={onPrevDate}>
                <SvgXml xml={BackIcon} />
              </TouchableOpacity>
              <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
              <TouchableOpacity onPress={onNextDate}>
                <SvgXml xml={ForwardIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.dateSelector}>
              <TouchableOpacity onPress={onPrevMonth}>
                <SvgXml xml={BackIcon} />
              </TouchableOpacity>
              <Text style={styles.dateText}>{formatMonth(selectedMonth)}</Text>
              <TouchableOpacity onPress={onNextMonth}>
                <SvgXml xml={ForwardIcon} />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.noteText}>
            Note: Lorem ipsum dolor sit amet conseictetur. Eit doloor.
          </Text>

          {/* Child Menu Selection or Meal Plans */}
          <View style={styles.menuHeader}>
            <SectionTitle>
              {selectedTab === 'custom'
                ? 'Select your Child’s Menu'
                : 'Available Dietitian Plans'}
            </SectionTitle>
            <TouchableOpacity>
              <SvgXml xml={questionIcon} width={20} height={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.menuSelection}>
            {selectedTab === 'custom' ? (
              // ---------------- Custom Plan ----------------
              <ScrollView
                style={styles.formContainer}
                keyboardShouldPersistTaps="handled">
                {childrenData.map((child, index) => (
                  <View key={child.id} style={styles.childForm}>
                    <Text style={styles.childName}>{child.name}</Text>
                    <MealsList
                      placeholder={`Select ${child.name}'s Dish`}
                      selectedValue={selectedDishes[index] || ''}
                      onSelectDish={handleDishSelect(index)}
                    />
                    {index === 0 && (
                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          value={applySameDish}
                          onValueChange={newValue => setApplySameDish(newValue)}
                          tintColors={{true: '#FF6600', false: '#ccc'}}
                        />
                        <Text style={styles.checkboxLabel}>
                          Apply the Same dish for all children
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
            ) : (
              // ---------------- Dietitian Plan ----------------

              <View style={{marginTop: 10}}>
                {Object.entries(mealPlans).map(([key, plan]) => {
                  const isSelected = selectedDietitianPlan?.name === plan.name;
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.planCard,
                        isSelected && styles.selectedPlanCard,
                      ]}
                      onPress={() => setSelectedDietitianPlan(plan)}>
                      {/* Radio + Title Row */}
                      <View style={styles.planHeader}>
                        <View
                          style={[
                            styles.radioOuter,
                            isSelected && styles.radioOuterSelected,
                          ]}>
                          {isSelected && <View style={styles.radioInner} />}
                        </View>
                        <Text
                          style={[
                            styles.planTitle,
                            isSelected && {color: '#fff'},
                          ]}>
                          {plan.name}
                        </Text>
                      </View>

                      {/* Meals preview */}
                      <View style={styles.mealRow}>
                        {plan.meals.slice(0, 3).map((meal, idx) => (
                          <Text
                            key={idx}
                            style={[
                              styles.mealText,
                              isSelected && {color: '#fff'},
                            ]}>
                            • {meal}
                          </Text>
                        ))}
                      </View>

                      {/* View More Button */}
                      <TouchableOpacity
                        style={[
                          styles.viewMoreBtn,
                          isSelected && {backgroundColor: '#fff'},
                        ]}
                        onPress={() => setSelectedPlan(plan)}>
                        <Text
                          style={[
                            styles.viewMoreText,
                            isSelected && {color: '#FF6600'},
                          ]}>
                          View More
                        </Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Buttons for Custom & Dietitian */}
          {(selectedTab === 'custom' || selectedTab === 'dietitian') && (
            <View style={styles.buttonsRow}>
              <SecondaryButton
                title="CANCEL"
                onPress={() => navigation.goBack()}
                style={{
                  width: wp('40%'),
                }}
              />

              {!isHoliday && (
                <PrimaryButton
                  title={loading ? 'Saving...' : 'SAVE'}
                  onPress={SaveMenue}
                  disabled={loading}
                  style={{
                    width: wp('40%'),
                  }}
                />
              )}

              {isHoliday && (
                <PrimaryButton
                  title="Pay Now"
                  onPress={handlePayNow}
                  style={{
                    width: wp('40%'),
                  }}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Sheet for Dietitian Plan */}
      <Modal
        visible={!!selectedPlan}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedPlan(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPlan?.name}</Text>
            <ScrollView>
              {selectedPlan?.meals.map((meal: string, idx: number) => (
                <Text key={idx} style={styles.mealText}>
                  • {meal}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setSelectedPlan(null)}>
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemeGradientBackground>
  );
};

export default MenuSelectionScreen;

// ################### STYLES #############################

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: hp('10%'),
    padding: 20,
  },
  list: {
    borderWidth: 1,
    borderColor: Colors.lightRed,
    marginTop: 5,
    maxHeight: 200,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  itemText: {
    color: Colors.bodyText,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  backText: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: wp('3.5%'),
    marginLeft: wp('2%'),
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: wp('2%'),
    marginBottom: hp('3%'),
    padding: wp('0.9%'),
  },
  tabButton: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: Colors.primaryOrange,
  },
  tabButtonText: {
    fontSize: wp('3.5%'),
    color: Colors.default,
    fontFamily: Fonts.Urbanist.regular,
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: '600',
  },
  selectedPlanCard: {
    backgroundColor: Colors.primaryOrange,
    borderColor: Colors.primaryOrange,
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  radioOuterSelected: {
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryOrange,
  },

  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightRed,
    borderRadius: wp('3%'),
    paddingVertical: hp('2.0%'),
    paddingHorizontal: wp('5%'),
    marginBottom: hp('1%'),
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.primaryOrange,
  },
  arrowText: {
    fontSize: wp('6%'),
    color: Colors.primaryOrange,
    fontWeight: '700',
  },
  dateText: {
    fontSize: wp('4.5%'),
    color: Colors.primaryOrange,
    fontFamily: Fonts.Urbanist.bold,
  },
  noteText: {
    fontSize: wp('3.5%'),
    color: Colors.black,
    marginBottom: hp('3%'),
  },
  menuSelection: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: wp('3%'),
    padding: wp('4%'),

    // ✅ Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // ✅ Elevation for Android
    elevation: 2,
  },

  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formContainer: {
    flexGrow: 1,
    marginBottom: hp('2%'),
    padding: 10,
  },
  childForm: {
    marginBottom: hp('3%'),
  },
  childName: {
    fontSize: wp('4.6%'),
    fontFamily: Fonts.Urbanist.semiBold,
    color: Colors.primaryOrange,
    marginBottom: hp('1%'),
    textTransform: 'capitalize',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.lightRed,
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  checkbox: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.lightRed,
    marginRight: wp('3%'),
  },
  checkedBox: {
    backgroundColor: Colors.primaryOrange,
    borderColor: Colors.primaryOrange,
  },
  checkboxLabel: {
    fontSize: wp('3.5%'),
    color: Colors.black,
  },
  buttonsRow: {
    marginTop:"10%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: wp('4%'),
    flexWrap: 'wrap',
    // gap: wp('4%'),
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.lightRed,
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  cancelText: {
    color: Colors.bodyText,
    fontWeight: '700',
    fontSize: wp('3.5%'),
  },
  // ---------------- Dietitian Plans ----------------
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  planTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
    color: Colors.primaryOrange,
  },
  mealRow: {marginBottom: 10},
  mealText: {fontSize: 14, color: Colors.black, marginBottom: 3},
  viewMoreBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primaryOrange,
    borderRadius: 6,
  },
  viewMoreText: {color: Colors.white, fontWeight: '600', fontSize: 13},
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: Colors.primaryOrange,
  },
  closeBtn: {
    color: Colors.primaryOrange,
    fontWeight: '700',
    marginTop: 15,
    textAlign: 'center',
  },
});
