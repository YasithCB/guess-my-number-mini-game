import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

export default function PrimaryButton({ children, onpress }) {
  return (
    <View>
      <Pressable
        onPress={onpress}
        style={({ pressed }) =>
          pressed ? [styles.container, styles.pressed] : styles.container
        }
      >
        <Text style={{ textAlign: "center" }}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: Colors.primary400,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 8,
    width: 100,
  },
  pressed: {
    opacity: 0.8,
  },
});
