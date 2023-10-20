import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(true);

  function onPickedNumber(pickedNumber) {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  }

  function onGameOver() {
    setIsGameOver(true);
  }

  function startNewGame() {
    setUserNumber(null)
  }

  let screen = <StartGameScreen onPickedNumber={onPickedNumber} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={onGameOver} />;
  }

  if (isGameOver && userNumber) {
    screen = <GameOverScreen onStartNewGame={startNewGame} />;
  }

  return (
    <>
      <StatusBar></StatusBar>
      <ImageBackground
        source={require("./assets/images/home-bg.jpg")}
        style={styles.rootContainer}
        imageStyle={styles.imgBg}
      >
        <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imgBg: {
    opacity: 0.28,
  },
});
