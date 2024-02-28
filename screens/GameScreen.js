import { Alert, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from 'react-native-paper';

import Title from "../components/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../components/PrimaryButton";

function generateRandomNumber(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min) + min);

  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver, onStartNewGame }) {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    } else if (guessRounds.length === 6) {
      Alert.alert("Congratulations!", "You won! Opponent failed to guess your number.", [
        { text: "Start Again", onPress: onStartNewGame },
      ]);
    }
  }, [currentGuess, userNumber, guessRounds, onGameOver]);
  

  useEffect(() => {
    (minBoundary = 1), (maxBoundary = 100);
  }, []);

  function nextGuess(direction) {
    if (
      (direction === "Lower" && userNumber > currentGuess) ||
      (direction === "Higher" && userNumber < currentGuess)
    ) {
      Alert.alert("Don't Lie!", "You know that is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "Lower") {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
    console.log(guessRounds);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <Text style={styles.guessedNumber}>{currentGuess}</Text>
      <Title>Higher or Lower?</Title>
      <View style={styles.buttonContainer}>
        <PrimaryButton onpress={nextGuess.bind(this, "Higher")}>
          Higher
        </PrimaryButton>
        <PrimaryButton onpress={nextGuess.bind(this, "Lower")}>
          Lower
        </PrimaryButton>
      </View>

      <Title>Attempts</Title>
      <FlatList
        data={guessRounds}
        renderItem={(itemData) => (
          <Card style={styles.card}>
            <Text style={styles.cardText} >{itemData.item}</Text>
          </Card>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginVertical: 35,
    padding: 16,
  },
  guessedNumber: {
    textAlign: "center",
    fontSize: 35,
    backgroundColor: Colors.primary500,
    paddingVertical: 10,
    color: "white",
    margin: 35,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },

  card: {
    backgroundColor: 'black',
    marginVertical: 2,
    padding: 10,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },

});
