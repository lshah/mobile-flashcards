import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { connect, useDispatch } from 'react-redux';
import { black, white } from '../utils/colors';
import ActionButton from './ActionButton';

const AddDeck = ({navigation}) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    
    const submitName = () => {
        if(text){
            saveDeckTitle(text);
            dispatch(addDeck(text));
            navigation.navigate('DeckView', {entryId: text});
            setText('');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is the name of your Deck</Text>
            <TextInput style={styles.input} onChangeText={(text) => setText(text)} value={text} />
            <ActionButton text={'Create Deck'} color={black} onPress={submitName}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: black,
        margin: 50,
        borderRadius: 8,
        color: black,
    },
    title: {
        fontSize: 20,
    },
});

export default connect()(AddDeck);