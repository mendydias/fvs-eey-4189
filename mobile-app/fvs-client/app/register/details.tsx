import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import CustomSelect from "@/components/inputs/CustomSelect";
import FormInput from "@/components/inputs/FormInput";
import { StatusBar } from "expo-status-bar";
import { GENDERS, Voter } from "@/models/voter";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";

const initialVoterValues = {
  nic: "",
  fullname: "",
  dob: new Date(),
  gender: GENDERS[0],
  email: "",
};

export default function RegisterDetailsPage() {
  const voterSchema = Yup.object().shape({
    nic: Yup.string().required("Your NIC cannot be empty"),
    fullname: Yup.string().required("Your name cannot be empty"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Your email address cannot be empty"),
  });

  const registerDetails = (voter: Voter) => {
    console.log(voter);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Heading text="FVS" />
        <Heading text="User Registration" level={2} />
      </View>
      <Formik
        initialValues={initialVoterValues}
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
            />
            {errors.nic && touched.nic && <Text>{errors.nic}</Text>}
            <FormInput
              placeholder="Full name"
              label="Full name"
              value={values.fullname}
              onValueChange={handleChange("fullname")}
              inputMode="text"
              mode="text"
              secure={false}
            />
            {errors.fullname && touched.fullname && (
              <Text>{errors.fullname}</Text>
            )}
            <FormInput
              label="Date of birth"
              value={values.dob}
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
            />
            {errors.email && touched.email && <Text>{errors.email}</Text>}
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
  header: {
    width: "100%",
    marginBottom: 16,
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
});
