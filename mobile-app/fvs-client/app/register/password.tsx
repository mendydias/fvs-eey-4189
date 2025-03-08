/**
 * @module PasswordRegistration
 * @description This module handles the password registration process for new users.
 * It includes form validation, submission handling, and user feedback.
 */
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, StyleSheet, View, Text, Alert } from "react-native";
import { FormHeader } from "@/components/FormHeader";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import FormInput from "@/components/inputs/FormInput";
import { Formik, FormikErrors, FormikProps } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import Voter, { useVoterStore } from "@/models/voter";
import registration from "@/services/registration";
import { useState } from "react";

const initialPasswordValues = {
  password: "",
  confirmPassword: "",
};

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password is less than 8 characters.")
    .max(50, "Password is greater than 50 characters.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password doesn't contain a mix of letters and numbers.",
    )
    .required("Password cannot be empty."),
  confirmPassword: Yup.string().required("Please confirm your password."),
});

const validate = (values: Yup.InferType<typeof passwordSchema>) => {
  const errors: FormikErrors<Yup.InferType<typeof passwordSchema>> = {};
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
};

type SetErrorMsgStateAction = (msg?: string) => void;
async function registerVoterWithCredentials(voter: Voter, password: string) {
  let response = await registration.registerVoter({ ...voter, password });
  if (response) {
    if (!response.ok) {
      const { message } = response.json;
      Alert.alert("Voter registration failed", message, [
        {
          text: "Retry",
          onPress: () => router.push("/register/details"),
          style: "cancel",
        },
        { text: "Login", onPress: () => router.push("/") },
      ]);
    } else {
      Alert.alert(
        "Voter registration is successful",
        "Tap the login button to login now",
      );
      router.push("/");
    }
  } else {
    Alert.alert("Something went wrong", "Retry in a few minutes.", [
      { text: "Ok", onPress: () => router.push("/register/details") },
    ]);
  }
}

export default function RegisterPasswordPage() {
  const store = useVoterStore();
  return (
    <SafeAreaView style={styles.container}>
      <FormHeader heading="Create User Login Credentials" />
      <Formik
        initialValues={initialPasswordValues}
        onSubmit={(values) =>
          registerVoterWithCredentials(store.state, values.password)
        }
        validationSchema={passwordSchema}
        validate={validate}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          values,
        }: FormikProps<Yup.InferType<typeof passwordSchema>>) => (
          <View style={styles.main}>
            <Typography>Create a password to login:</Typography>
            <FormInput
              label="Password:"
              inputMode="text"
              mode="text"
              secure
              value={values.password}
              onValueChange={handleChange("password")}
              placeholder="Password"
              errorMessage={touched.password ? errors.password : undefined}
              instructions={[
                "Password must be at least 8 characters.",
                "Password must contain at least one letter.",
                "Password must contain at least one number.",
              ]}
            />
            <FormInput
              label="Confirm Password:"
              inputMode="text"
              mode="text"
              secure
              value={values.confirmPassword}
              onValueChange={handleChange("confirmPassword")}
              placeholder="Confirm Password"
              errorMessage={
                touched.confirmPassword ? errors.confirmPassword : undefined
              }
            />
            <Button
              label="Register!"
              viewVariant="primary"
              textVariant="primaryText"
              onPress={() => handleSubmit()}
              style={{ marginTop: 44 }}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
});
