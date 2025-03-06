import { Pressable, StyleSheet, Text, View } from "react-native";

type CustomSelectProps = {
  options: string[];
  current: string;
  onChange: (option: string) => void;
  label: string;
};

export default function CustomSelect({
  options,
  current,
  onChange,
  label,
}: CustomSelectProps) {
  return (
    <View style={styles.selectWrapper}>
      <Text style={{ marginBottom: 4 }}>{label}</Text>
      {options.map((option, index) => (
        <Pressable
          key={index}
          onPress={() => onChange(option)}
          style={
            option === current
              ? [styles.option, { backgroundColor: "#2D3648" }]
              : styles.option
          }
        >
          <Text
            style={
              option === current ? { color: "#fff" } : { color: "#2D3648" }
            }
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  selectWrapper: {
    width: 320,
    height: 96,
  },
  option: {
    paddingVertical: 8,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#2D3648",
  },
});
