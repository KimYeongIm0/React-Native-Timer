import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TimerCountDownDisplay } from "./TimerCountDownDisplay";
import { TimerToggleButton } from "./TimerToggleButton";
import { TimerModeDisplay, TimerModes } from "./TimerModeDisplay";

const FOCUS_TIME_MINUTES = 2 * 60 * 1000;
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimerRunning, setisTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerModes>("Focus");

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === "Focus") {
        setTimerMode("Break");
        setTimerCount(BREAK_TIME_MINUTES);
      } else {
        setTimerMode("Focus");
        setTimerCount(FOCUS_TIME_MINUTES);
      }
      stopTimer();
    }
  }, [timerCount]);
  const startTimer = () => {
    setisTimerRunning(true);
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setTimerInterval(id);
  };

  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }
    setisTimerRunning(false);
  };

  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: timerMode === "Break" ? "#436fff" : "#ffaa43" },
      }}
    >
      <TimerModeDisplay timerMode={timerMode} />
      <StatusBar style="auto" />
      <TimerToggleButton
        isTimerRunning={isTimerRunning}
        stopTimer={stopTimer}
        startTimer={startTimer}
      ></TimerToggleButton>

      <TimerCountDownDisplay
        timerDate={new Date(timerCount)}
        setTimerCount={setTimerCount}
        setisTimerRunning={setisTimerRunning}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffaa43",
    alignItems: "center",
    justifyContent: "center",
  },
});
