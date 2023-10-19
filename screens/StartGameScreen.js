import { StyleSheet, View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/Colors";

export default function StartGameScreen({onPickedNumber}) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function onChangeNumber(number) {
    setEnteredNumber(number);
  }

  function onResetInput() {
    setEnteredNumber("");
  }

  function onConfirm() {
    const number = parseInt(enteredNumber);
    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert("Invalid Number!", "Number must be between 1-99", [
        { text: "Okey", style: "destructive", onPress: onResetInput },
      ]);
      return;
      }
      onPickedNumber(number)
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        value={enteredNumber}
        onChangeText={onChangeNumber}
      />
      <View style={styles.buttonContainer}>
        <PrimaryButton onpress={onResetInput}>Reset</PrimaryButton>
        <PrimaryButton onpress={onConfirm}>Confirm</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 60,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: Colors.primary300,
    borderRadius: 8,
    elevation: 4,
    alignItems: "center",
    opacity: 0.9,
    // shadow for ios
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 50,
    width: 55,
    textAlign: "center",
    fontSize: 28,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
