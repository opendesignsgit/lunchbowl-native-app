import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { deleteIcon, editIcon } from '../../assets/svg';
import { SvgXml } from 'react-native-svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface Customer {
  id: string;
  name: string;
  dob?: string;
  phoneNumber: string;
  email: string;
  bankAccount: string;
}

interface Props {
  customer: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CustomerCard: React.FC<Props> = ({ customer, onEdit, onDelete }) => {
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{customer.firstName}</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => onEdit(customer.id)} style={styles.iconBtn}>
            <SvgXml xml={editIcon} width={wp(5)} height={wp(5)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(customer.id)} style={styles.iconBtn}>
            <SvgXml xml={deleteIcon} width={wp(5)} height={wp(5)} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Date of Birth</Text>
        <Text style={styles.value}>{formatDate(customer.dob)}</Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{customer.phoneNumber}</Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Email</Text>
        <Text
          style={[styles.value, styles.link]}
          onPress={() => Linking.openURL(`mailto:${customer.email}`)}
        >
          {customer.email}
        </Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Bank Account Number</Text>
        <Text style={styles.value}>{customer.ban}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
   
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  separator: {
    height: hp(0.2),
    backgroundColor: '#E0E0E0',
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: wp(3),
  },
  name: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#222',
  },
  detail: {
    marginTop: hp(1.5),
  },
  label: {
    fontSize: wp(4),
    color: '#000',
    fontWeight: '600',
  },
  value: {
    fontSize: wp(4),
    color: '#000',
    marginTop: hp(0.5),
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default CustomerCard;
