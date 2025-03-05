import { FontAwesome } from "@expo/vector-icons";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Pressable, StyleSheet, Text } from "react-native";

type CalendarInputProps = {
  dateValue: Date;
  onDateChanged: (date: Date) => void;
  ariaLabel: string;
};

export default function CalendarInput({
  dateValue,
  onDateChanged,
  ariaLabel,
}: CalendarInputProps) {
  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate == undefined) {
      //default behavior is to set the current date.
      onDateChanged(new Date());
    } else {
      onDateChanged(selectedDate);
    }
  };

  const showDatePicker = () =>
    DateTimePickerAndroid.open({
      value: dateValue,
      onChange,
      mode: "date",
    });

  return (
    <Pressable
      accessibilityLabel={ariaLabel}
      style={styles.formInput}
      onPress={showDatePicker}
    >
      <Text>{dateValue.toDateString()}</Text>
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
