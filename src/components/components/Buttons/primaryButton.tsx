import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { addFilledIcon, calender } from '../../assets/svg';

interface PrimaryButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  addFilledIcon?: string; 
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  addFilledIcon, // Make sure you keep this
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.content}>
        {addFilledIcon && (
          <SvgXml xml={addFilledIcon} width={15} height={15} style={styles.icon} />
        )}
        <Text style={styles.buttonText}> {title}</Text>
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#413fbf',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
 
  },
  icon: {
    marginRight: 8,
    color: '#FFFFFF', 
  },
});

export default PrimaryButton;
