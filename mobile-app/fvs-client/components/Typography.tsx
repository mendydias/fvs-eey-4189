import { StyleSheet, Text } from "react-native";

type TypographyProps = {
  children: string | string[];
};

export default function Typography({ children }: TypographyProps) {
  return <Text style={styles.txt}>{children}</Text>;
}

const styles = StyleSheet.create({
  txt: {
    color: "#2D3648",
    fontSize: 16,
  },
});
