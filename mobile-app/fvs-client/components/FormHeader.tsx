import { View, StyleSheet } from "react-native";
import Heading from "./Heading";

interface FormHeaderProps {
  heading: string;
}

export function FormHeader({ heading }: FormHeaderProps) {
  return (
    <View style={styles.header}>
      <Heading text="FVS" />
      <Heading text={heading} level={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    marginBottom: 16,
  },
});
