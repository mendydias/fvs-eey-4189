import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import CustomSelect from "@/components/inputs/CustomSelect";
import FormInput from "@/components/inputs/FormInput";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GENDERS } from "@/models/voter";

export default function RegisterDetailsPage() {
  const [nic, onNicChange] = useState("");
  const [fullname, onNameChange] = useState("");
  const [dob, onDobChange] = useState(new Date());
  const [gender, onGenderChange] = useState(GENDERS[0]);
  const [email, onEmailChange] = useState("");

  const registerDetails = () => {
    alert("Successfully registered!");
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Heading text="FVS" />
        <Heading text="User Registration" level={2} />
      </View>
      <View style={styles.main}>
        <FormInput
          testId="nic"
          label="National Identification Number"
          value={nic}
          onValueChange={onNicChange}
          inputMode="text"
          mode="text"
          secure={false}
        />
        <FormInput
          testId="fullname"
          label="Full name"
          value={fullname}
          onValueChange={onNameChange}
          inputMode="text"
          mode="text"
          secure={false}
        />
        <FormInput
          testId="dob"
          label="Date of birth"
          value={dob}
          onValueChange={onDobChange}
          mode="date"
        />
        <CustomSelect
          testId="gender"
          options={GENDERS}
          current={gender}
          onChange={onGenderChange}
          label="Gender"
        />
        <FormInput
          testId="email"
          label="Email address"
          value={email}
          onValueChange={onEmailChange}
          inputMode="email"
          mode="text"
          secure={false}
        />
        <Button
          label="Register!"
          viewVariant="primary"
          textVariant="primaryText"
          style={{ marginTop: 44 }}
          onPress={registerDetails}
        />
      </View>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
  header: {
    width: "100%",
    marginBottom: 16,
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
});
