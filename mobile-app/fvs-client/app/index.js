import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Heading from "../components/Heading";
import FormInput from "../components/inputs/FormInput";
import { router } from "expo-router";

export default function LoginPage() {
  const [nic, onNicChange] = useState("");
  const [password, onPasswordChange] = useState("");

  const login = () => {
    router.replace("/vote/choose");
  };

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
        <Button variant="primary" label="Login" onPress={login} />
        <Button variant="secondary" label="Register" link="/register/details" />
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
  main: {
    marginTop: 48,
  },
  footer: {
    marginTop: 48,
    width: 320,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
