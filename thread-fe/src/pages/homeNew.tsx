import {
  Box,
  Button,
  GridItem,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { VscFileMedia } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { RightBar } from "../features/global/RightBar";
import { SideBar } from "../features/global/SideBar";
import SimpleSidebar from "../features/global/sidebar/NewSideBar";
import ThreadCardNew from "../features/thread/component/ThreadCardNew";
import { API } from "../lib/api";
import { THREAD_GET } from "../stores/rootReducer";
import { RootState } from "../stores/types/rootState";
import { IGetThreads } from "../types/interface/IType";

export function HomeNew() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [time, setTime] = useState("past");

  const [form, setForm] = useState<IGetThreads>({
    content: "",
    image: "",
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

  async function fetchData() {
    try {
      const res = await API.get("/thread/", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      dispatch(THREAD_GET(res.data));
    } catch (error) {
      console.error("error");
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleSubmit(event: FormEvent) {
    // if (!form.content) {
    //   return alert("Please enter your message");
    // }
    event.preventDefault();
    postData();
    setTime("yes");
  }

  async function postData() {
    try {
      const formData = new FormData();
      formData.append("content", form.content as string);
      formData.append("image", form.image as File);
      const res = await API.post("/thread/create", formData);
      setTime("now");
      console.log("data", formData);
      fetchData();
      setForm(res.data);
    } catch (err) {
      console.error({ error: "salah ya ni", err });
    }
  }
  const thread = useSelector((state: RootState) => state.thread.threads);

  useEffect(() => {
    setTime("when");
    fetchData();
  }, [time]);

  return (
    <>
      <Box display={{ base: "block", sm: "block", md: "none" }}>
        <SimpleSidebar />
      </Box>
      <Box display={"flex"} h="fit-content" gap={4}>
        <GridItem
          colSpan={2}
          display={{ base: "none", sm: "none", md: "block" }}
          minW={"200px"}
        >
          <SideBar />
        </GridItem>
        <GridItem
          colSpan={5}
          borderEnd="2px"
          borderLeft="2px"
          borderColor="#2f2f2f"
          p={5}
          // display={["none", "none", "none", "none", "block"]}
          w={["100%", "100%", "100%", "100%", "100%"]}
        >
          <Box>
            <Stack spacing={3} mb={4}>
              <Text fontSize="40px" fontWeight="medium">
                Home
              </Text>
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
                    <Box display="flex" justifyContent="end">
                      <Button
                        type="submit"
                        width="70px"
                        // borderRadius={50}
                        bgColor="#04a51e"
                      >
                        post
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Stack>
          </Box>
          {thread.map((item, index) => {
            return (
              <ThreadCardNew
                key={index}
                allData={item}
                id={item.id}
                author_picture={item.user?.profile_picture}
                author_full_name={item.user?.full_name}
                author_username={item.user?.username}
                posted_at={item.posted_at}
                author_id={item.user?.id}
                content={item.content}
                image={item.image}
                replies_count={item.replies_count}
                likes_count={item.likes_count}
                likes={item.likes}
                liked={item.likes?.likes_count}
                date={item.date}
              />
            );
          })}
        </GridItem>
        <GridItem
          colSpan={3}
          display={["none", "none", "none", "block", "block"]}
          minW={"400px"}
        >
          <RightBar />
        </GridItem>
      </Box>
    </>
  );
}
