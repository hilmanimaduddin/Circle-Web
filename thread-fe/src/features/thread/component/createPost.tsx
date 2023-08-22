import { Box, Button, Image, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, FormEvent, useState, useRef } from "react";
import { API } from "../../../lib/api";
import { ThreadCardType, IGetThreads } from "../../../types/interface/IType";
import { VscFileMedia } from "react-icons/vsc";
import { AUTH_LOGIN } from "../../../stores/rootReducer";

export function CreatePost() {
  const [form, setForm] = useState<IGetThreads>({
    content: "",
    image: "",
    // user: 0,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  // console.log(form);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    postData();
  }

  async function postData() {
    try {
      const formData = new FormData();
      formData.append("content", form.content as string);
      formData.append("image", form.image as File);
      const res = await API.post("/thread/create", formData);
      console.log(res.config.data);
      setForm(res.data);
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

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
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
            encType="multipart/form-data"
          >
            <Box display={"flex"} gap={4}>
              <Input
                mb={3}
                name="content"
                onChange={handleChange}
                variant="outline"
                placeholder="What is happening?!"
              />
              <Button
                fontSize={20}
                bgColor="#04a51e"
                onClick={handleButtonClick}
              >
                <VscFileMedia />
              </Button>
              <Input
                mb={3}
                type="file"
                name="image"
                onChange={handleChange}
                variant="outline"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </Box>
            <Box display="flex" justifyContent="end">
              <Button
                type="submit"
                width="100px"
                borderRadius={50}
                bgColor="#04a51e"
              >
                post
              </Button>
            </Box>
          </form>
        </Box>
      </Stack>
    </>
  );
}
