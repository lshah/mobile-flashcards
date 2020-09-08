import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { black, white } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import { connect, useDispatch } from 'react-redux';
import { addCardToDeckAction } from '../actions';
import ActionButton from './ActionButton';

const AddCard = ({route, navigation}) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const dispatch = useDispatch();
    const submitCard = (deck) => {
        if(question && answer){
            dispatch(addCardToDeckAction({ question, answer, correctAnswer, deck }));
            addCardToDeck(deck, { question, answer, correctAnswer });
            setQuestion('');
            setAnswer('');
            setCorrectAnswer('');
            navigation.goBack(NavigationActions.back({ key: null }));
        };
    };

    const deckName = route.params.entryId
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Enter new question?</Text>
                <TextInput style={styles.input} onChangeText={(question) => setQuestion(question)} value={question}></TextInput>

                <Text style={styles.title}>Enter answer?</Text>
                <TextInput style={styles.input} onChangeText={(answer) => setAnswer(answer)} value={answer}></TextInput>
                
                <Text style={styles.title}>Is the answer true or false?</Text>
                <TextInput style={styles.input} onChangeText={(correctAnswer) => setCorrectAnswer(correctAnswer)} value={correctAnswer}></TextInput>

                <ActionButton text={'Submit'} color={black} onPress={() => submitCard(deckName)}/>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: black,
        margin: 25,
        borderRadius: 8,
    },
});

export default connect()(AddCard);