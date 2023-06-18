import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";

type Props = {
  timerDate: Date;
  setTimerCount: number;
  setisTimerRunning: boolean;
};
export const TimerCountDownDisplay: React.FC<Props> = ({ timerDate }) => {
  const [selectedMinutes, setSelectedMinutes] = useState("");
  const [selectedSeconds, setSelectedSeconds] = useState("");

  const handleSetTime = () => {
    const minutes = parseInt(selectedMinutes, 10);
    const seconds = parseInt(selectedSeconds, 10);

    if (isNaN(minutes) || isNaN(seconds)) {
      return;
    }

    const newTimerCount = (minutes * 60 + seconds) * 1000;
    setTimerCount(newTimerCount);
  };

  const generatePickerItems = (start: number, end: number) => {
    const items = [];
    for (let i = start; i <= end; i++) {
      const value = i.toString().padStart(2, "0");
      items.push({ label: value, value });
    }
    return items;
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={pickerStyles}
            value={selectedMinutes}
            onValueChange={(value) => setSelectedMinutes(value)}
            items={generatePickerItems(0, 59)}
            placeholder={{ label: "00", value: null }}
          />
          <Text style={styles.pickerLabel}>분</Text>
        </View>

        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={pickerStyles}
            value={selectedSeconds}
            onValueChange={(value) => setSelectedSeconds(value)}
            items={generatePickerItems(0, 59)}
            placeholder={{ label: "00", value: null }}
          />
          <Text style={styles.pickerLabel}>초</Text>
        </View>
      </View>

      <Button title="시간설정" onPress={handleSetTime} color={"#a84cf3"} />

      <Text style={styles.timerCountDownText}>
        {timerDate.getMinutes().toString().padStart(2, "0")}:
        {timerDate.getSeconds().toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 13,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 10, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginLeft: 5,
  },
  timerCountDownText: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
    marginLeft: 20,
  },
});
