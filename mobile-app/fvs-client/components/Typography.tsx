import { StyleSheet, Text } from "react-native";

type TypographyProps = {
  children: string | string[];
};

export default function Typography({ children }: TypographyProps) {
  return <Text style={styles.regular}>{children}</Text>;
}

const styles = StyleSheet.create({
  regular: {
    color: "#2D3648",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 4,
  },
});
