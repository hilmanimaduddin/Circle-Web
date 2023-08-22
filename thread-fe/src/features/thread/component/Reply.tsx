import { Box, Button, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useReply } from "../hooks/useReply";

export function AddReply() {
  const { handleChange, postData } = useReply();

  return (
    <>
      <Stack spacing={3} mb={4} mt={5} width={"100%"}>
        <Box display="flex" gap="10px">
          <Image
            borderRadius="full"
            boxSize="30px"
            objectFit="cover"
            src="https://cdn1.katadata.co.id/media/images/thumb/2021/10/06/Kucing_Bengal-2021_10_06-10_17_15_ad40e6fefe890f0db85dd31bd4d5d0c9_960x640_thumb.jpg"
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
