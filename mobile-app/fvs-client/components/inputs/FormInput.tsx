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
import ErrorMessage from "../ErrorMessage";

type StringConsumer = (value: string) => void;
type DateConsumer = (date: Date) => void;

type DateFormInputProps = {
  mode: "date";
  label: string;
  onValueChange: DateConsumer;
  value: Date;
  ariaLabel: string;
};

type TextFormInputProps = {
  mode: "text";
  label: string;
  value: string;
  onValueChange: StringConsumer;
  secure: boolean;
  inputMode?: InputModeOptions;
  placeholder: string;
  instructions?: string[];
  errorMessage?: string;
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
          ariaLabel={props.ariaLabel}
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
          placeholder={props.placeholder}
        />
        {props.errorMessage && <ErrorMessage message={props.errorMessage} />}
        {props.instructions && (
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionsHeader}>Instructions:</Text>
            {props.instructions.map((instruction, index) => (
              <Text key={index} style={styles.instructionLabel}>
                {instruction}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formField: {
    width: 320,
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
  instructionContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: 16,
  },
  instructionLabel: {
    color: "#2D3648",
    fontSize: 8,
  },
  instructionsHeader: {
    color: "#2D3648",
    fontSize: 8,
    fontWeight: "bold",
  },
});
