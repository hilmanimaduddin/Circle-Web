import { Box, Button, Image, Input, Stack, Text } from "@chakra-ui/react";

export function CreatePost() {
  return (
    <>
      <Stack spacing={3} mb={4}>
        <Text fontSize="40px" fontWeight="medium">
          Home
        </Text>
        <Box display="flex" gap="10px">
          <Image
            borderRadius="full"
            boxSize="30px"
            objectFit="cover"
            src="https://cdn1.katadata.co.id/media/images/thumb/2021/10/06/Kucing_Bengal-2021_10_06-10_17_15_ad40e6fefe890f0db85dd31bd4d5d0c9_960x640_thumb.jpg"
            alt="image"
          />
          <Stack spacing={3} width="100%">
            <Input variant="outline" placeholder="What is happening?!" />
            <Input variant="outline" placeholder="Image" />
            <Box display="flex" justifyContent="end">
              <Button width="100px" borderRadius={50} bgColor="#04a51e">
                Post
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
