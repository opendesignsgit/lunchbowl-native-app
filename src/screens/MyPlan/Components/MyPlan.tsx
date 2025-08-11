import PrimaryButton from 'components/buttons/PrimaryButton';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type PlanCardProps = {
    userName: string;
    plan: string;
    amount: string;
    status: string;
    expiry: string;
};

const PlanCard: React.FC<PlanCardProps> = ({ userName, plan, amount, status, expiry }) => {

    function upgrade(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.planTitle}>{userName}’s Current Plan</Text>
                <Text style={[styles.status, status === 'Expired' && styles.statusExpired]}>{status}</Text>
            </View>
            <Text style={styles.planSubText}>
                {plan} – {amount}
            </Text>
            <Text style={styles.expiryText}>Expires on:</Text>
            <Text style={styles.expiryDate}>{expiry}</Text>
            <PrimaryButton
                title="UPGRADE PLAN"
                onPress={upgrade}
                style={{ width: '100%' }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff4ee',
        borderRadius: 12,
        padding: wp('5%'),
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        borderRightWidth: wp('1%'),
        borderBottomWidth: wp('1%'),
        borderTopWidth: wp('0.1%'),
        borderLeftWidth: wp('0.1%'),
        borderColor: '#F37520',
        marginLeft:10
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    planTitle: {
        fontSize: 16,
        color: '#FF6514',
        fontFamily: 'Urbanist-SemiBold'
    },
    planSubText: {
        fontSize: 14,
        color: '#67686A',
        marginTop: 4,
        fontFamily: 'Urbanist-SemiBold'

    },
    status: {
        backgroundColor: '#ffffff',
        color: '#4AB238',
        paddingHorizontal: 8,
        borderRadius: 12,
        fontSize: 12,
        padding: 5,
        alignSelf: 'flex-start',
        fontFamily: 'Urbanist-ExtraBold'
    },
    statusExpired: {
        backgroundColor: '#ffffff',
        color: '#ff0000',
        paddingHorizontal: 8,
        borderRadius: 12,
        fontSize: 12,
        padding: 5,
        alignSelf: 'flex-start',
        fontFamily: 'Urbanist-ExtraBold'
    },
    expiryText: {
        marginTop: 10,
        fontSize: 12,
        color: '#67686A',
    },
    expiryDate: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },

});

export default PlanCard;
