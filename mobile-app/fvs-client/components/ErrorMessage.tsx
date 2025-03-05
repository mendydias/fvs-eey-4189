import { Text, StyleSheet } from "react-native";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  return <Text style={styles.error}>{props.message}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: "#FF0000",
    fontSize: 8,
  },
});
