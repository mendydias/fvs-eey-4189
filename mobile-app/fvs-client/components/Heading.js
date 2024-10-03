import { StyleSheet, Text } from "react-native";

export default function Heading({ text, level }) {
  let levelStyle;
  switch (level) {
    case 2:
      levelStyle = styles.headerTwo;
      break;
    default:
      levelStyle = styles.headerOne;
  }

  return <Text style={levelStyle}>{text}</Text>;
}

const styles = StyleSheet.create({
  headerOne: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#2D3648",
    textAlign: "center",
  },
  headerTwo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2D3648",
    height: 43,
    textAlign: "center",
  },
});
