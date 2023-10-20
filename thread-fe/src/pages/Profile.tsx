import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SideBar } from "../features/thread/component/SideBar";
import { UserBar } from "../features/thread/component/UserBar";
import { API } from "../lib/api";
import ThreadCardNew from "../pagesNew/Component/ThreadCardNew";
import { RootState } from "../stores/types/rootState";

export function Profile() {
  // const [thread, setThread] = useState<ThreadCardType[]>([]);
  const [data, setData] = useState<any[]>([]);
  // const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function fetchData() {
    try {
      const res = await API.get(`/thread-user`);
      setData(res.data);
    } catch (error) {
      console.error("error");
    }
  }
  console.log("user", user);

  const [form, setForm] = useState({
    username: user?.username,
    fullname: user?.full_name,
    email: user?.email,
    password: "",
    description: user?.profile_description,
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Grid h="fit-content" templateColumns="repeat(10, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <SideBar />
        </GridItem>
        <GridItem
          colSpan={5}
          borderEnd="2px"
          borderLeft="2px"
          borderColor="#2f2f2f"
          p={5}
        >
          <Box
            fontSize="40px"
            fontWeight="medium"
            display={"flex"}
            gap={3}
            alignItems={"center"}
          >
            <Link to={`/`}>
              <VscArrowLeft />
            </Link>
            <Text>My Profile</Text>
          </Box>
          <Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                p={4}
                border={"2px"}
                borderRadius={9}
                borderColor="#2f2f2f"
                display={"flex"}
                flexDirection={"column"}
              >
                <Image
                  src="https://i.vimeocdn.com/video/1118803646-cf91319cca62e75b948f598e639f3a7e1e295d7bf007d09df37b778ed32683a4-d_640x360.jpg"
                  alt=""
                />
                <Image
                  borderRadius="full"
                  boxSize="140px"
                  mt={"-80px"}
                  ml={"7%"}
                  objectFit={"cover"}
                  src={
                    user.profile_picture ??
                    "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg"
                  }
                  alt="profil"
                />
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box>
                    <Text>{user.full_name}</Text>
                    <Text>@{user.username}</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.profile_description}</Text>
                  </Box>
                  <Box>
                    <Button onClick={onOpen}>Edit Profile</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>My Profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box>
                      <label htmlFor="username">
                        Username
                        <Input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Username"
                          value={form.username}
                          onChange={handleChange}
                        />
                      </label>
                      <label htmlFor="name">
                        Full Name
                        <Input
                          type="text"
                          id="name"
                          name="fullname"
                          placeholder="Full Name"
                          value={form.fullname}
                          onChange={handleChange}
                        />
                      </label>
                      <label htmlFor="email">
                        Email
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </label>
                      <label htmlFor="password">
                        Password
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Your Password"
                          value={form.password}
                          onChange={handleChange}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <Input
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Your Description"
                          value={form.description}
                          onChange={handleChange}
                        />
                      </label>
                      <label htmlFor="image">
                        Image
                        <Input
                          p={1}
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleChange}
                        />
                      </label>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Box>
          {data.map((item, index) => {
            return (
              <ThreadCardNew
                key={index}
                id={item.id}
                author_picture={item.user?.profile_picture}
                author_full_name={item.user?.full_name}
                author_username={item.user?.username}
                posted_at={item.posted_at}
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
        <GridItem colSpan={3}>
          {/* <RightBar /> */}

          <UserBar />
        </GridItem>
      </Grid>
    </>
  );
}
