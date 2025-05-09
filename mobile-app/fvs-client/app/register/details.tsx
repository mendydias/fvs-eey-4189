import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Button from "@/components/Button";
import CustomSelect from "@/components/inputs/CustomSelect";
import FormInput from "@/components/inputs/FormInput";
import { StatusBar } from "expo-status-bar";
import Voter, { GENDERS, useVoterStore } from "@/models/voter";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import { FormHeader } from "@/components/FormHeader";
import { router } from "expo-router";

const initialVoterValues = {
  nic: "",
  fullname: "",
  dob: new Date(),
  gender: GENDERS[0],
  email: "",
};

const voterSchema = Yup.object().shape({
  nic: Yup.string().required("Your NIC cannot be empty"),
  fullname: Yup.string().required("Your name cannot be empty"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Your email address cannot be empty"),
});

export default function RegisterDetailsPage() {
  const { state, dispatch } = useVoterStore();

  const registerDetails = (voter: Voter) => {
    if (dispatch === undefined) {
      throw new Error("Cannot save voter as voter dispatch is undefined");
    }
    dispatch({ type: "setVoterDetails", payload: voter });
    router.push("/register/password");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormHeader heading="User Registration" />
      <Formik
        initialValues={state}
        validationSchema={voterSchema}
        onSubmit={registerDetails}
      >
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }: FormikProps<Voter>) => (
          <View style={styles.main}>
            <FormInput
              label="National Identification Number"
              placeholder="NIC"
              value={values.nic}
              onValueChange={handleChange("nic")}
              inputMode="text"
              mode="text"
              secure={false}
              errorMessage={errors.nic && touched.nic ? errors.nic : undefined}
            />
            <FormInput
              placeholder="Full name"
              label="Full name"
              value={values.fullname}
              onValueChange={handleChange("fullname")}
              inputMode="text"
              mode="text"
              secure={false}
              errorMessage={
                errors.fullname && touched.fullname
                  ? errors.fullname
                  : undefined
              }
            />
            <FormInput
              label="Date of birth"
              value={new Date(values.dob)} // Formik stores all form values as strings unless a type is passed
              onValueChange={(date) => handleChange("dob")(date.toDateString())} // HACK: refactor this into a function
              mode="date"
              ariaLabel="Date of birth"
            />
            <CustomSelect
              options={GENDERS}
              current={values.gender}
              onChange={handleChange("gender")}
              label="Gender"
            />
            <FormInput
              placeholder="Email address"
              label="Email address"
              value={values.email}
              onValueChange={handleChange("email")}
              inputMode="email"
              mode="text"
              secure={false}
              errorMessage={
                errors.email && touched.email ? errors.email : undefined
              }
            />
            <Button
              label="Register!"
              viewVariant="primary"
              textVariant="primaryText"
              style={{ marginTop: 44 }}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
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
  main: {
    width: "100%",
    alignItems: "center",
  },
});
