import { Pressable, StyleSheet, Text, View } from "react-native";
import Heading from "./components/Heading";
import FormInput from "./components/FormInput";
import { useState } from "react";

export default function App() {
  const [nic, onNicChange] = useState("");
  const [password, onPasswordChange] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading text="FVS" />
        <Heading text="Welcome!" level={2} />
      </View>
      <View style={styles.main}>
        <FormInput
          label="NIC/Email"
          value={nic}
          onValueChange={onNicChange}
          inputMode="email"
        />
        <FormInput
          label="Password"
          value={password}
          onValueChange={onPasswordChange}
          secure={true}
        />
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
