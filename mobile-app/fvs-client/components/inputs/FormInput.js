import { StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarInput from "./CalendarInput";

export default function FormInput({
  label,
  value,
  onValueChange,
  secure,
  inputMode,
  mode,
}) {
  return (
    <View style={styles.formField}>
      <Text style={styles.textLabel}>{label}</Text>
      {mode === "date" ? (
        <CalendarInput onDateChanged={onValueChange} dateValue={value} />
      ) : (
        <TextInput
          style={styles.input}
          value={value}
          onChange={onValueChange}
          secureTextEntry={secure}
          inputMode={inputMode}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formField: {
    marginVertical: 4,
    width: 320,
    height: 72,
    justifyContent: "center",
  },
  textLabel: {
    color: "#2D3648",
    marginBottom: 4,
  },
  input: {
    borderColor: "#CBD2E0",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
});
