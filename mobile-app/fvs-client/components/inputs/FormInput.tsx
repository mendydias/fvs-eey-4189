import {
  InputModeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import CalendarInput from "./CalendarInput";

type StringConsumer = (value: string) => void;
type DateConsumer = (date: Date) => void;

type DateFormInputProps = {
  mode: "date";
  label: string;
  onValueChange: DateConsumer;
  value: Date;
};

type TextFormInputProps = {
  mode: "text";
  label: string;
  value: string;
  onValueChange: StringConsumer;
  secure: boolean;
  inputMode?: InputModeOptions;
};

type FormInputProps = DateFormInputProps | TextFormInputProps;

export default function FormInput(props: FormInputProps) {
  if (props.mode == "date") {
    return (
      <View style={styles.formField}>
        <Text style={styles.textLabel}>{props.label}</Text>
        <CalendarInput
          onDateChanged={props.onValueChange}
          dateValue={props.value}
        />
      </View>
    );
  }
  if (props.mode == "text") {
    return (
      <View style={styles.formField}>
        <Text style={styles.textLabel}>{props.label}</Text>
        <TextInput
          style={styles.input}
          value={props.value}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            props.onValueChange(e.nativeEvent.text)
          }
          secureTextEntry={props.secure}
          inputMode={props.inputMode}
        />
      </View>
    );
  }
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
