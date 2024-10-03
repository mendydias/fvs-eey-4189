import { StyleSheet, Text } from "react-native";

export default function Typography({ children }) {
  return <Text style={styles.txt}>{children}</Text>;
}

const styles = StyleSheet.create({
  txt: {
    color: "#2D3648",
    fontSize: 16,
  },
});
