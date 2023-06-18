import React from "react";
import { StyleSheet, Button, Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
type Props = {
  isTimerRunning: boolean;
  stopTimer: () => void;
  startTimer: () => void;
};

export const TimerToggleButton: React.FC<Props> = ({
  isTimerRunning,
  stopTimer,
  startTimer,
}) => {
  return (
    <Pressable onPress={isTimerRunning ? stopTimer : startTimer}>
      <View style={styles.container}>
        <FontAwesome
          name={isTimerRunning ? "pause" : "play"}
          size={50}
          style={styles.icon}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    color: "#fff",
  },
  container: {
    borderWidth: 2,
    width: 70,
    height: 70,
    borderRadius: 250 / 2,
    justifyContent: "center",
    borderColor: "#fff",
    marginVertical: 50,
  },
});
