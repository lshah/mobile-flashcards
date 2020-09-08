import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { black, white, gray, red, green } from '../utils/colors';
import ActionButton from './ActionButton';
import { connect } from 'react-redux';
import InfoButton from './InfoButton';

const Quiz = ({route, navigation, decks}) => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [showQuestion, setShowQuestion] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [incorrectAnswer, setIncorrectAnswer] = useState(0);

    const showAnswer = () => (
        !showQuestion ? setShowQuestion(true) : setShowQuestion(false)
    )

    const submitAnswer = (answer) => {
        const deck = route.params.entryId
        const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()

        if(answer.trim() === correct.trim()){
            setCorrectAnswer(correctAnswer + 1)
        } else {
            setIncorrectAnswer(incorrectAnswer + 1)
        }

        setQuestionNumber(questionNumber + 1)
        setShowQuestion(false)
    }

    const restartQuiz = () => {
        setQuestionNumber(0);
        setCorrectAnswer(0);
        setIncorrectAnswer(0);
        setShowQuestion(false);
    }
    
    const goBack = () => {
         navigation.goBack(NavigationActions.back({ key: null }))
     }

    const deck = route.params.entryId
    const currentQuestionNumber = questionNumber + 1

    if(questionNumber === decks[deck].questions.length){
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.showAnswerText} >You got {correctAnswer} out of {decks[deck].questions.length} questions right! </Text>
                </View>
                {correctAnswer > incorrectAnswer ? <Text style={{ fontSize: 65 }}>🦄🦄🦄</Text> : <Text style={{ fontSize: 65 }}>🙈🙉🙊</Text>}
                <View style={styles.actionBtnContainer}>
                    <ActionButton onPress={restartQuiz} text={'Restart Quiz'} color={black} />
                    <ActionButton onPress={goBack} text={'Back to Deck'} color={gray} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
        <Text style={styles.questionCount}>Question: {currentQuestionNumber} / {decks[deck].questions.length}</Text>
            <View>
                <View style={styles.textContainer}>
                    {!showQuestion
                    ? <Text style={styles.questionText}>{decks[deck].questions[questionNumber].question}</Text>
                    : <Text style={styles.questionText}>{decks[deck].questions[questionNumber].answer}</Text>}
                    
                    {!showQuestion
                    ? <InfoButton style={styles.showAnswerText} onPress={showAnswer} text='Show Answer'></InfoButton>
                    : <InfoButton style={styles.showAnswerText} onPress={showAnswer} text='Show Question'></InfoButton>}
                </View>
                <View style={styles.actionBtnContainer}>
                    <ActionButton onPress={() => submitAnswer('true')} text={'Correct'} color={green} />
                    <ActionButton onPress={() => submitAnswer('false')} text={'Incorrect'} color={red} />
                </View>
            </View>
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
    questionCount: {
        marginTop: 30,
        fontSize: 15,
        textAlign: 'left',
        marginTop: 50,
        marginRight: 250,
    },
    questionText: {
        fontSize: 25,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    showAnswerText: {
        fontSize: 20,
        marginTop: 100,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionBtnContainer: {
        marginBottom: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz);
