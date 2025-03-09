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
import { Form } from "react-router";

export default function LoginPage() {
  return (
    <Flex
      width="full"
      height="full"
      alignItems="center"
      justifyContent="center"
    >
      <LoginForm />
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

function LoginForm() {
  return (
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
        <Form style={{ width: "100%" }}>
          <Stack marginY="4" gap="4" width="full" padding="4">
            <Field.Root required>
              <Field.Label color="primary">Email address:</Field.Label>
              <Input placeholder="Username" />
            </Field.Root>
            <Field.Root required>
              <Field.Label color="primary">Password:</Field.Label>
              <Input placeholder="Password" />
            </Field.Root>
          </Stack>
          <Center>
            <Button
              variant="outline"
              color="primary"
              _hover={{ color: "secondary" }}
            >
              Login
            </Button>
          </Center>
        </Form>
      </VStack>
    </Box>
  );
}
