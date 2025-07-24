import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SecondaryButton from '../Buttons/secondaryButton';
import DiscardButton from '../Buttons/discardButton';
import { closeIcon } from '../../assets/svg';
import { SvgXml } from 'react-native-svg';

interface ConfirmModalProps {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
const BottomConfirmModal: React.FC<ConfirmModalProps> = ({
    visible,
    message,
    onConfirm,
    onCancel,
}) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.message}>Delete Customer</Text>
                        <TouchableOpacity onPress={onCancel}>
                            <SvgXml xml={closeIcon} width={30} height={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            Do you want to delete{' '}
                            <Text style={[styles.description, { fontWeight: 'bold' }]}>
                                {message}
                            </Text>{' '}
                            information?
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <SecondaryButton
                            title="Yes"
                            onPress={onConfirm}
                            style={styles.button}
                        />
                        <DiscardButton
                            title="No"
                            onPress={onCancel}
                            style={styles.button}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '100%',
        height: hp(25),
        backgroundColor: '#ffffff',
        borderRadius: wp(3.75),
        padding: wp(3),
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: wp(2.5),
        elevation: 5,
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: wp(2),
    },
    icon: {
        marginRight: 5,
        width: 20,
        height: 20,
    },
    message: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: wp(6),
        lineHeight: wp(7.25),
        letterSpacing: -0.004,
        color: '#000000',
        flexWrap: 'wrap',
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: wp(1),
    },
    description: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: wp(4),
        lineHeight: wp(5.5),
        letterSpacing: -0.004,
        color: '#000000',
        flexWrap: 'wrap',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        width: '100%',
        marginTop: hp(2),
    },
    button: {
        flex: 1,
        height: hp(6),
        width: wp('40%'),
        marginHorizontal: wp(2),
        justifyContent: 'center',
    },
});

export default BottomConfirmModal;