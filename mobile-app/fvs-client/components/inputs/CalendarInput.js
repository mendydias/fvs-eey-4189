import { FontAwesome } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Pressable, StyleSheet, Text } from "react-native";

export default function CalendarInput({ dateValue, onDateChanged }) {
  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    onDateChanged(currentDate);
  };

  const showDatePicker = () =>
    DateTimePickerAndroid.open({
      value: dateValue,
      onChange,
      mode: "date",
    });

  return (
    <Pressable style={styles.formInput} onPress={showDatePicker}>
      <Text>
        {dateValue.getDate()} - {dateValue.getMonth()} -{" "}
        {dateValue.getFullYear()}
      </Text>
      <FontAwesome name="calendar" size={20} color="#2D3648" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  formInput: {
    width: 320,
    height: 48,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#CBD2E0",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
});
