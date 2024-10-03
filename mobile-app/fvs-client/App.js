import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import HeaderOne from "./components/HeaderOne";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderOne text="FVS" />
        <Text>Welcome!</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <Text>NIC/Email</Text>
          <TextInput />
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput />
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable>
          <Text></Text>
        </Pressable>
        <Pressable>
          <Text></Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {},
  main: {},
  footer: {},
});
