import { Box, Button, Image, Input, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API } from "../../../../lib/api";
import { RootState } from "../../../../stores/types/rootState";
import { IReply } from "../../../../types/interface/IReply";

export function ReplyNew() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [time, setTime] = useState("");
  const [form, setForm] = useState<IReply>({
    content: "",
    thread: id,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function postData() {
    try {
      await API.post("/replies/create", form);
      setTime("now");
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

  const [reply, setReply] = useState<IReply[]>([]);

  async function fetchData() {
    try {
      const res = await API.get(`/replies?thread_id=${id}`);
      setTime("waw");
      setReply(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTime("good job");
    fetchData();
  }, [time]);

  return (
    <>
      <Stack spacing={3} mb={4} mt={5} width={"100%"}>
        <Box display="flex" gap="10px">
          <Image
            borderRadius="full"
            boxSize="30px"
            objectFit="cover"
            src={
              user?.profile_picture ??
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
            }
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
      <Box>
        {reply.map((item, index) => {
          return (
            <Box
              borderBottom="1px"
              borderColor={"gray"}
              display={"flex"}
              gap={3}
              key={index}
            >
              <Image
                mt={2}
                src={
                  item.user?.profile_picture ??
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
                }
                alt=""
                borderRadius="full"
                boxSize={"35px"}
                objectFit="cover"
              />
              <Box mb={2}>
                <Box display={"flex"} gap={3}>
                  <Text>{item.user?.full_name}</Text>
                  <Text color={"#6f6f6f"} fontStyle={"italic"}>
                    @{item?.user?.username}
                  </Text>
                  <Text>
                    {moment(item.posted_at).startOf("minute").fromNow()}
                  </Text>
                </Box>
                <Text>{item.content}</Text>
                {/* <Text display={"flex"} alignItems={"center"} gap={1}>
                  <VscHeartFilled />
                  17 likes
                </Text> */}
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
