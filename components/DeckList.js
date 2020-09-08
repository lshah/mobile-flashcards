import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDecks } from '../utils/api';
import { black, white, gray, lightGray } from '../utils/colors';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import ActionButton from './ActionButton';

const DeckList = ({ navigation, receiveAllDecks, decks }) => {
    useEffect(() => {
        getDecks()
            .then(decks => receiveAllDecks(decks))
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                {Object.keys(decks).map(deck => {
                    const { title, questions } = decks[deck]
                    return (
                        <View key={deck} style={styles.card}>
                            <Text style={styles.cardText}>{title}</Text>
                            <Text style={styles.cardCountText}>{questions.length} {`${questions.length === 1 ? 'card' : 'cards'}`}</Text>
                            <ActionButton style={styles.actionBtn} text={'View Deck'} color={black} onPress={() => navigation.navigate('DeckView', {entryId: deck})}/>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightGray,
        margin: 5,
        height: 200,
        width: 350,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 20,
        color: black,
    },
    cardCountText: {
        fontSize: 17,
        color: gray,
    },
});

const mapStateToProps = (decks) => {
    return {
        decks
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        receiveAllDecks: (decks) => dispatch(receiveDecks(decks))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);