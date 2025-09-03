import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

type AppTextProps = {
  children: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

const Typography: React.FC<AppTextProps> = ({ children, style, numberOfLines }) => {
  return (
    <Text
      style={style}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail" 
    >
      {children}
    </Text>
  );
};

export default Typography;
