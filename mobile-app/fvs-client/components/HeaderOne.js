import { StyleSheet, Text } from "react-native";

export default function HeaderOne({ text }) {
  return <Text style={styles.headerOne}>{text}</Text>;
}

const styles = StyleSheet.create({
  headerOne: {
    fontSize: 56,
    color: "#2D3648",
  },
});
