
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PrimaryButton from '../Buttons/primaryButton';
import { SvgXml } from 'react-native-svg';
import { calender } from '../../assets/svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { format } from 'date-fns';

interface DatePickerProps {
  date: Date | null;
  onConfirm: (date: Date) => void;
  placeholder?: string;
  iconXml?: string;
}

const ModalDatePicker: React.FC<DatePickerProps> = ({
  date,
  onConfirm,
  placeholder = 'Select Date',
  iconXml,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [tempDate, setTempDate] = useState(date || new Date());

  const handleConfirm = () => {
    setSelectedDate(tempDate);
    setIsVisible(false);
    onConfirm(tempDate);
  };

  const handleOpen = () => {
    setTempDate(selectedDate || new Date());
    setIsVisible(true);
  };

  return (
    <View>
      <View style={styles.inputWrapper}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={handleOpen}
        >
          {iconXml || calender ? (
            <SvgXml
              xml={iconXml || calender}
              width={wp(5)}
              height={wp(5)}
              style={styles.icon}
            />
          ) : null}
          <Text style={styles.text}>
            {selectedDate
              ? selectedDate.toLocaleDateString()
              //  Use date-fns format below instead if imported
              // ? format(selectedDate, 'dd MMM yyyy')
              : placeholder}
          </Text>
        </TouchableOpacity>
      </View>

      {isVisible && (
        <Modal transparent={true} animationType="slide" visible={isVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <DatePicker
                date={tempDate}
                mode="date"
                minimumDate={new Date()}
                onDateChange={setTempDate}
                locale="en"
              />
              <View style={styles.buttonContainer}>
                <View style={styles.buttonRow}>
                  <PrimaryButton
                    title="Cancel"
                    onPress={() => setIsVisible(false)}
                    style={styles.cancelButton}
                  />
                  <PrimaryButton
                    title="Confirm"
                    onPress={handleConfirm}
                    style={styles.confirmButton}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: '#ccc',
    marginBottom: hp(1.5),
  },
  inputContainer: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: wp(4),
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: wp(10),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  icon: {
    marginRight: wp(2.5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  cancelButton: {
    height: hp(6),
    justifyContent: 'center',
    flex: 1,
    marginRight: wp(1.5),
  },
  confirmButton: {
    height: hp(6),
    justifyContent: 'center',
    flex: 1,
    marginLeft: wp(1.5),
  },
});

export default ModalDatePicker;
