import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { API } from "../../../lib/api";

interface ImageState {
  image: string | Blob | MediaSource | null;
}

export default function ProfileImage(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState<ImageState>({
    image: "",
  });
  console.log("image", image);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setImage({
        ...image,
        [name]: files[0],
      });
    }
  };

  const handleOpenModal = () => {
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleImageClick = () => {
    handleOpenModal();
  };

  const handleImageUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image.image as File);
      const res = await API.post(`/auth/update/image`, formData);
      console.log("success", res);
    } catch (error) {
      console.error("error", error);
    }
    handleCloseModal();
  };

  const imageInput = document.getElementById(
    "imageInput"
  ) as HTMLInputElement | null;
  const previewImage = document.getElementById(
    "previewImage"
  ) as HTMLImageElement | null;

  if (imageInput) {
    imageInput.addEventListener("change", (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (previewImage) {
            previewImage.src = e.target?.result as string;
            previewImage.style.display = "block";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
  return (
    <>
      <Box>
        <Image
          borderRadius="full"
          boxSize="140px"
          mt={"-80px"}
          ml={"7%"}
          objectFit={"cover"}
          src={
            props.image ??
            "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg"
          }
          alt="profil"
          onClick={handleImageClick}
          _hover={{
            cursor: "pointer",
          }}
        />
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Gambar</ModalHeader>
            <ModalBody>
              <Image
                id="previewImage"
                src="#"
                alt="Preview Image"
                style={{ display: "none" }}
              />
              <Input
                type="file"
                id="imageInput"
                accept="image/*"
                name="image"
                onChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleImageUpdate}>
                Simpan
              </Button>
              <Button variant="ghost" onClick={handleCloseModal}>
                Batal
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
