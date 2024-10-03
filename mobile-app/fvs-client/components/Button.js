import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ label, onPress, variant }) {
  console.log(styles);
  return (
    <Pressable style={styles[variant]} onPress={onPress}>
      <Text style={styles[variant + "Text"]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    width: 105,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D3648",
    borderRadius: 4,
  },
  primaryText: {
    color: "#fff",
  },
  secondary: {
    width: 105,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#2D3648",
  },
  secondaryText: {
    color: "#2D3648",
  },
});
