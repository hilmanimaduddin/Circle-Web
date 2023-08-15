import { Box, Image, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { API } from "../../../lib/api";
import { ThreadCardType } from "../../../types/IType";

export function CreatePost() {
  // function HandleSubmit(event) {
  //   event.preventDefault();

  //   const form = event.target;

  //   // fetch("/thread/create", );

  //   const formnya = "dheihf";
  //   console.log(formnya);
  // }

  const [form, setForm] = useState<ThreadCardType>({
    content: "",
    image: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  console.log(form);

  async function postData() {
    try {
      const res = await API.post("/thread/create", form);
      console.log(res.config.data);
      setForm(res.data);
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
          <form
            action="http://localhost:5000/api/v1/thread/create"
            encType="multipart/form-data"
            method="post"
          >
            <Input
              mb={3}
              name="content"
              onChange={handleChange}
              variant="outline"
              placeholder="What is happening?!"
            />
            <Input
              mb={3}
              type="file"
              name="image"
              onChange={handleChange}
              variant="outline"
            />
            <Box display="flex" justifyContent="end">
              <Input
                type="submit"
                width="100px"
                onClick={postData}
                borderRadius={50}
                bgColor="#04a51e"
                value="Post"
              />
            </Box>
          </form>
        </Box>
      </Stack>
    </>
  );
}
