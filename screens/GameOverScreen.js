import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";

export default function GameOverScreen({onStartNewGame}) {
  return (
    <View style={styles.container}>
      <Title>Game Over! Opponent found your Number</Title>
      <View style={styles.buttonContainer}>
        <PrimaryButton onpress={onStartNewGame}>Start Game Again</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
  },
});
