import { Box, Button, Image, Input, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/types/rootState";
import { useReply } from "../../hooks/useReply";

export function AddReply() {
  const user = useSelector((state: RootState) => state.user);
  const { handleChange, postData } = useReply();

  return (
    <>
      <Stack spacing={3} mb={4} mt={5} width={"100%"}>
        <Box display="flex" gap="10px">
          <Image
            borderRadius="full"
            boxSize="30px"
            objectFit="cover"
            src={user.profile_picture}
            alt="image"
          />
          <Box width={"100%"} display={"flex"} gap={4}>
            <Input
              mb={3}
              name="content"
              onChange={handleChange}
              variant="outline"
              placeholder="What is happening?!"
            />
            <Button
              type="submit"
              width="100px"
              onClick={postData}
              borderRadius={50}
              bgColor="#04a51e"
            >
              post
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
