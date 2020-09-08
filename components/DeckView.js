import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import { black, white, gray } from '../utils/colors';

const DeckView = ({ route, navigation, decks }) => {
        const deck = route.params.entryId;
        const { title, questions } = decks[deck];
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>{title}</Text>
                    <Text style={styles.cardCountText}>{questions.length} {`${questions.length === 1 ? 'card' : 'cards'}`}</Text>
                </View>
                <View style={styles.actionBtnContainer}>
                    <ActionButton text={'Add Card'} color={black} onPress={() => navigation.navigate('AddCard', {entryId: deck})}/>
                    <ActionButton text={'Start Quiz'} color={gray} onPress={() => navigation.navigate('Quiz', {entryId: deck})}/>
                </View>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionBtnContainer: {
        marginBottom: 170,
    },
    cardText: {
        fontSize: 30,
        color: black,
    },
    cardCountText: {
        fontSize: 20,
        color: gray,
    },
});

const mapStateToProps = (decks) => {
    return {
        decks
    }
};

export default connect(mapStateToProps)(DeckView);