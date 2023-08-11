import {
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Container,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Container alignContent="center" mt="20">
        <Stack spacing={3}>
          <Text fontSize="40px" fontWeight="bold" color="#04a51e">
            Circle
          </Text>
          <Text fontSize="20px">Login to Circle</Text>
          <Input variant="outline" placeholder="Email*" />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Password*"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Text display="flex" justifyContent="end">
            <Link to="/">Forgot Password?</Link>
          </Text>
          <Button borderRadius={50} bgColor="#04a51e">
            Login
          </Button>
          <Box display="flex" gap="5px" justifyContent="end">
            <Text>Don't have any acount yet?</Text>
            <Text color="#04a51e">
              <Link to="/register">create acount</Link>
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
