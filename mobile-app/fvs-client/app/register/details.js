import { StyleSheet, View } from "react-native";
import Heading from "../../components/Heading";
import FormInput from "../../components/inputs/FormInput";
import { useState } from "react";

export default function RegisterDetailsPage() {
  const [nic, onNicChange] = useState("");
  const [fullname, onNameChange] = useState("");
  const [dob, onDobChange] = useState(new Date());
  const [gender, onGenderChange] = useState("");
  const [email, onEmailChange] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading text="FVS" />
        <Heading text="User Registration" level={2} />
      </View>
      <View style={styles.main}>
        <FormInput
          label="National Identification Number"
          value={nic}
          onValueChange={onNicChange}
          inputMode="text"
        />
        <FormInput
          label="Full name"
          value={fullname}
          onValueChange={onNameChange}
          inputMode="text"
        />
        <FormInput
          label="Date of birth"
          value={dob}
          onValueChange={onDobChange}
          mode="date"
        />
        <FormInput
          label="National Identification Number"
          value={nic}
          onValueChange={onNicChange}
          inputMode="text"
        />
        <FormInput
          label="National Identification Number"
          value={nic}
          onValueChange={onNicChange}
          inputMode="text"
        />
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    flex: 1,
    width: "100%",
  },
  main: {
    flex: 3,
    width: "100%",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    width: "100%",
  },
});
