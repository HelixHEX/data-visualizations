import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
const App = () => {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/yearly";
    }
  }, [])
  return (
    <>
      <Flex w="100%" h="100vh">
        <Nav>
          <Flex justifyContent={'center'} w="100%" h="100%">
            <Flex w={{base: '100%', md: '60%'}} h='80%' alignSelf={'center'} p={50}>
              <Outlet />
            </Flex>
          </Flex>
        </Nav>
      </Flex>
    </>
  );
};

export default App;
