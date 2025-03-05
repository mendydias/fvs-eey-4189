import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { FormHeader } from "@/components/FormHeader";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import FormInput from "@/components/inputs/FormInput";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/components/ErrorMessage";

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
  const errors: { confirmPassword: string | null } = { confirmPassword: null };
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
};

export default function RegisterPasswordPage() {
  return (
    <SafeAreaView style={styles.container}>
      <FormHeader heading="Create User Login Credentials" />
      <Formik
        initialValues={initialPasswordValues}
        onSubmit={(values) => console.log(values.password)}
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
