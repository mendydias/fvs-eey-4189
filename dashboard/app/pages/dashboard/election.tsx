import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  HStack,
  Input,
  Text,
  Table,
  VStack,
} from "@chakra-ui/react";
import * as voterService from "~/services/voter-service";
import * as authService from "~/services/auth-service";
import type { Route } from "../../+types/root";
import { Form, useNavigate } from "react-router";
import { parseWithZod } from "@conform-to/zod";
import { Link } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  const token = await authService.getToken(request);
  const submission = parseWithZod(formData, {
    schema: voterService.ElectionSchema,
  });
  if (submission.status !== "success") {
    submission.reply();
  }
  await voterService.createElection(
    token,
    submission.payload as voterService.Election
  );
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  let elections: voterService.Election[] | null = null;
  if (loaderData) {
    elections = loaderData;
  }
  return (
    <Box width="dvw" height="dvh" backgroundColor="white" overflow="hidden">
      <Box padding="4" backgroundColor="secondary" width="full">
        <Heading size="5xl" color="primary">
          FVS Dashboard: Elections
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
                  <Table.ColumnHeader>Title</Table.ColumnHeader>
                  <Table.ColumnHeader>Start Date</Table.ColumnHeader>
                  <Table.ColumnHeader>End Date</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {elections &&
                  (elections as voterService.Election[]).map(
                    (election, index) => (
                      <Table.Row
                        key={index}
                        color="black"
                        backgroundColor="white"
                      >
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{election.title}</Table.Cell>
                        <Table.Cell>{election.start_date}</Table.Cell>
                        <Table.Cell>{election.end_date}</Table.Cell>
                      </Table.Row>
                    )
                  )}
              </Table.Body>
            </Table.Root>
          </Container>
          <Container maxW="lg" marginTop="4">
            <Heading size="lg" color="primary">
              Create Election
            </Heading>
            <Form method="post">
              <VStack gap="4" width="full" padding="4">
                <Field.Root>
                  <Field.Label color="black" htmlFor="title">
                    Title
                  </Field.Label>
                  <Input color="black" name="title" id="title" />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="black" htmlFor="start_date">
                    Start Date
                  </Field.Label>
                  <Input color="black" name="start_date" id="start_date" />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="black" htmlFor="end_date">
                    End Date
                  </Field.Label>
                  <Input color="black" name="end_date" id="end_date" />
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
