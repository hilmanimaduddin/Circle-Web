import {
  Box,
  Button,
  GridItem,
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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SideBar } from "../features/global/SideBar";
import { UserBar } from "../features/global/UserBar";
import SimpleSidebar from "../features/global/sidebar/NewSideBar";
import ProfileBackground from "../features/profile/component/ProfileBackground";
import ProfileImage from "../features/profile/component/ProfileImage";
import ThreadCardNew from "../features/thread/component/ThreadCardNew";
import { API } from "../lib/api";
import { RootState } from "../stores/types/rootState";

interface ProfileProps {
  username: string;
  full_name: string;
  profile_description: string;
}
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

  const [form, setForm] = useState<ProfileProps>({
    username: user?.username as string,
    full_name: user?.full_name as string,
    profile_description: user?.profile_description as string,
  });
  console.log("form", form);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    handleUpdate();
    onClose();
  }

  async function handleUpdate() {
    try {
      const res = await API.post(`/auth/update`, form);
      // console.log("formData", formData);
      console.log("res", res);

      console.log("success");
      fetchData();
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log("user", user);

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
                w={"100%"}
                p={4}
                border={"2px"}
                borderRadius={9}
                borderColor="#2f2f2f"
                display={"flex"}
                flexDirection={"column"}
              >
                <ProfileBackground
                  image={
                    user.profile_background ??
                    "https://i.vimeocdn.com/video/1118803646-cf91319cca62e75b948f598e639f3a7e1e295d7bf007d09df37b778ed32683a4-d_640x360.jpg"
                  }
                />
                {/* <Image
                  src="https://i.vimeocdn.com/video/1118803646-cf91319cca62e75b948f598e639f3a7e1e295d7bf007d09df37b778ed32683a4-d_640x360.jpg"
                  alt=""
                /> */}
                <ProfileImage
                  image={
                    user.profile_picture ??
                    "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg"
                  }
                />
                {/* <Image
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
                /> */}
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
                          name="full_name"
                          placeholder="Full Name"
                          value={form.full_name}
                          onChange={handleChange}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <Input
                          type="text"
                          id="description"
                          name="profile_description"
                          placeholder="Your Description"
                          value={form.profile_description}
                          onChange={handleChange}
                        />
                      </label>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit}>
                      Update
                    </Button>
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
        <GridItem
          colSpan={3}
          display={["none", "none", "none", "block", "block"]}
          minW={"400px"}
        >
          {/* <RightBar /> */}

          <UserBar />
        </GridItem>
      </Box>
    </>
  );
}
