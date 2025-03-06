import { Text, StyleSheet, View } from "react-native";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  error: {
    color: "#FF0000",
    fontSize: 8,
  },
});
