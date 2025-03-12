import {
  Box,
  Button,
  Container,
  Drawer,
  Text,
  Field,
  Heading,
  Input,
  Table,
  VStack,
  HStack,
} from "@chakra-ui/react";
import * as voterService from "~/services/voter-service";
import * as authService from "~/services/auth-service";
import type { Route } from "../../+types/root";
import { Form, Link } from "react-router";
import { parseWithZod } from "@conform-to/zod";

export async function loader({ request }: { request: any }) {
  const token = await authService.getToken(request);
  const voters = await voterService.getAllVoters(token);
  return voters;
}

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: voterService.VoterSchema,
  });
  if (submission.status !== "success") {
    submission.reply();
  }
  await voterService.registerVoter(submission.payload as voterService.Voter);
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  let voters: voterService.Voter[] | null = null;
  if (loaderData) {
    voters = loaderData;
  }
  return (
    <Box width="dvw" height="dvh" overflow="hidden" backgroundColor="white">
      <Box padding="4" backgroundColor="secondary" width="full">
        <Heading size="5xl" color="primary">
          FVS Dashboard: Voters
        </Heading>
      </Box>
      <HStack width="full" height="full">
        <VStack
          style={{ width: "20%" }}
          backgroundColor="secondary"
          height="full"
          padding="4"
        >
          <Heading size="lg" color="primary" marginBottom="4">
            Navigation
          </Heading>
          <Link to="/dashboard" style={{ margin: "8px" }}>
            <Text color="primary">Voters</Text>
          </Link>
          <Link to="/elections" style={{ margin: "8px" }}>
            <Text color="primary">Elections</Text>
          </Link>
        </VStack>
        <VStack style={{ width: "80%" }} marginTop="16" height="full">
          <Container maxW="2xl" px="2">
            <Table.Root size="md">
              <Table.Header color="secondary" backgroundColor="primary">
                <Table.Row>
                  <Table.ColumnHeader>#</Table.ColumnHeader>
                  <Table.ColumnHeader>NIC</Table.ColumnHeader>
                  <Table.ColumnHeader>Full name</Table.ColumnHeader>
                  <Table.ColumnHeader>Date of birth</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {voters &&
                  (voters as voterService.Voter[]).map((voter, index) => (
                    <Table.Row
                      key={index}
                      color="black"
                      backgroundColor="white"
                    >
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{voter.nic}</Table.Cell>
                      <Table.Cell>{voter.fullname}</Table.Cell>
                      <Table.Cell>{voter.dob}</Table.Cell>
                      <Table.Cell>{voter.email}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Container>
          <Container maxW="lg" marginTop="4">
            <Heading size="lg" color="primary">
              Create voter
            </Heading>
            <Form method="post">
              <VStack gap="4" width="full" padding="4">
                <Field.Root>
                  <Field.Label color="black" htmlFor="nic">
                    NIC
                  </Field.Label>
                  <Input color="black" name="nic" id="nic" />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="black" htmlFor="fullname">
                    Full name
                  </Field.Label>
                  <Input color="black" name="fullname" id="fullname" />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="black" htmlFor="email">
                    Email address
                  </Field.Label>
                  <Input color="black" name="email" id="email" />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="black" htmlFor="dob">
                    Date of birth
                  </Field.Label>
                  <Input color="black" name="dob" id="dob" />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="black" htmlFor="gender">
                    Gender
                  </Field.Label>
                  <Input color="black" name="gender" id="gender" />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="black" htmlFor="password">
                    Password
                  </Field.Label>
                  <Input color="black" name="password" id="password" />
                </Field.Root>
                <Button type="submit" variant="outline" color="primary">
                  Submit
                </Button>
              </VStack>
            </Form>
          </Container>
        </VStack>
      </HStack>
    </Box>
  );
}
