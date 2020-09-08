import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white } from '../utils/colors';

const ActionButton = ({ onPress, text, color }) => {
        return (
            <TouchableOpacity onPress={onPress} style={[styles.actionBtn, { backgroundColor: color}]}>
                <Text style={styles.submitBtnText}>{text}</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    actionBtn: {
        padding: 7,
        borderRadius: 7,
        height: 45,
        margin: 5,
        width: 150,
    },
    submitBtnText: {
        color: white,
        fontSize: 18,
        textAlign: 'center',
    },
})

export default ActionButton;