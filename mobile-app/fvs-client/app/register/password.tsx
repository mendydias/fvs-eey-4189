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
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot be more than 50 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter and one number",
    )
    .required("Password cannot be empty"),
  confirmPassword: Yup.string().required("Please confirm your password"),
});

const validate = (values: Yup.InferType<typeof passwordSchema>) => {
  const errors: { confirmPassword: string | null } = { confirmPassword: null };
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
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
            />
            {errors.password && touched.password && (
              <ErrorMessage message={errors.password} />
            )}
            <Typography>Type the password again to confirm:</Typography>
            <FormInput
              label="Confirm Password:"
              inputMode="text"
              mode="text"
              secure
              value={values.confirmPassword}
              onValueChange={handleChange("confirmPassword")}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword} />
            )}
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
