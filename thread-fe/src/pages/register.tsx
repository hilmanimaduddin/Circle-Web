import { Box, Button, Container, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <>
      <Container alignContent="center" mt="20">
        <Stack spacing={3}>
          <Text fontSize="40px" fontWeight="bold" color="#04a51e">
            Circle
          </Text>
          <Text fontSize="20px">Create account Circle</Text>
          <Input variant="outline" placeholder="Username*" />
          <Input variant="outline" placeholder="Email*" />
          <Input variant="outline" placeholder="Password*" />
          <Button borderRadius={50} bgColor="#04a51e">
            Create
          </Button>
          <Box display="flex" gap="5px" justifyContent="left">
            <Text>Already have account?</Text>
            <Text color="#04a51e">
              <Link to="/login">login</Link>
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
