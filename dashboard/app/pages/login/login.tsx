import {
  Box,
  Button,
  Center,
  Field,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, redirect } from "react-router";
import { z } from "zod";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useActionData } from "react-router";
import { useForm } from "@conform-to/react";
import type { Route } from "../../+types/root";
import { loginSchema } from "~/services/auth-service";
import * as authService from "~/services/auth-service";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: loginSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const token = await authService.login(submission.value);
  return authService.storeToken(request, token);
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult: actionData,
    constraint: getZodConstraint(loginSchema),
    id: "loginFormId",
    defaultValue: {
      email: "",
      password: "",
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        backgroundColor="white"
        display="flex"
        width="full"
        height="full"
        alignItems="center"
        justifyContent="center"
      >
        <VStack padding="8">
          <Heading color="primary" size="5xl">
            FVS
          </Heading>
          <Heading color="primary" size="4xl">
            Welcome back!
          </Heading>
          <Text color="primary">
            Please enter your username and password to access your account.
          </Text>
          <Form
            id={form.id}
            method="post"
            onSubmit={form.onSubmit}
            style={{ width: "100%" }}
          >
            <Stack marginY="4" gap="4" width="full" padding="4">
              <Field.Root
                invalid={fields.email.errors && fields.email.errors.length > 0}
              >
                <Field.Label htmlFor={fields.email.id} color="primary">
                  Email address:
                </Field.Label>
                <Input
                  id={fields.email.id}
                  name={fields.email.name}
                  color="primary"
                  defaultValue={fields.email.initialValue}
                  placeholder="Username"
                />
                <Field.ErrorText id={fields.email.errorId}>
                  {fields.email.errors}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root
                invalid={
                  fields.password.errors && fields.password.errors.length > 0
                }
              >
                <Field.Label htmlFor={fields.password.id} color="primary">
                  Password:
                </Field.Label>
                <Input
                  id={fields.password.id}
                  name={fields.password.name}
                  type="password"
                  color="primary"
                  defaultValue={fields.password.initialValue}
                  placeholder="Password"
                />
                <Field.ErrorText color="red" id={fields.password.errorId}>
                  {fields.password.errors}
                </Field.ErrorText>
              </Field.Root>
            </Stack>
            <Center>
              <Button
                variant="outline"
                color="primary"
                _hover={{ color: "secondary" }}
                type="submit"
              >
                Login
              </Button>
            </Center>
          </Form>
        </VStack>
      </Box>
      <Center
        backgroundColor="secondary"
        width="full"
        height="full"
        overflow="hidden"
      >
        <Image src="/fingerprint.jpg" width="full" />
      </Center>
    </Flex>
  );
}
