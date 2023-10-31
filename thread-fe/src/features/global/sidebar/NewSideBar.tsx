import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { FaHeart, FaHome, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGOUT } from "../../../stores/rootReducer";

interface LinkItemProps {
  name: string;
  icon: IconType;
  lin: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FaHome, lin: "/" },
  { name: "Follow", icon: FaHeart, lin: "/follower" },
  { name: "Profile", icon: FaUser, lin: "/profil" },
  //   { name: "Log Out", icon: FiStar, lin: "/login" },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function logOut() {
    dispatch(AUTH_LOGOUT());
    navigate("/login");
  }
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} lin={link.lin}>
          {link.name}
        </NavItem>
      ))}
      <Button ml={5} borderRadius={50} bgColor="#04a51e" onClick={logOut}>
        <Text
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
        >
          Log Out
        </Text>
      </Button>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  lin: string;
}
const NavItem = ({ icon, children, lin, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={lin}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        // _hover={{
        //   bg: "cyan.400",
        //   color: "white",
        // }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontWeight="bold">
        Circle
      </Text>
    </Flex>
  );
};
