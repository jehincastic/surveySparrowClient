import { Box, Button, IconButton, Text, Tooltip, useToast } from '@chakra-ui/react';
import React from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { Link as routerLink, useHistory, useLocation } from "react-router-dom";

import { UserContext } from '../providers/UserProvider';
import { postMethod } from '../utils/fetchData';
import { ColorSwitcher } from './ColorSwitcher';

interface NavBarProps {}


const NavBar: React.FC<NavBarProps> = () => {
  const { loggedIn, loading, setLoggedIn, setUserInfo } = React.useContext(UserContext);
  const toast = useToast();
  const history = useHistory();
  const location = useLocation();
  const logOutzClicked = async () => {
    await postMethod<any, any>('/logout', {}).catch(err => {});
    toast({
      title: 'Successfully Logged Out',
      description: '',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
    setUserInfo({
      id: 0,
      name: '',
      email : ''
    });
    history.push('/');
    setLoggedIn(false);
  };

  return (
    <Box
      display="flex"
      flexDir="row"
      width="100%"
      rowSpan={1}
      p={3}
    >
      <Box
        justifyContent="flex-start"
        p={3}
        rowSpan={1}
        width="100%"
        flexDir="row"
        alignSelf="center"
      >
        <Text fontSize="2xl" as="b">url app</Text>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        flexDir="row"
        width="100%"
        rowSpan={1}
        p={3}
      >
        <ColorSwitcher />
        {loading ? <> </> : <>
          { loggedIn ?
            <>
              {
                location.pathname === '/urls'
                  ? <Tooltip label="Create New Url" fontSize="md">
                    <IconButton
                      as={routerLink}
                      to="/create"
                      size="md"
                      fontSize="2xl"
                      variant="ghost"
                      color="current"
                      icon={<FaPlus />}
                      aria-label={`Add New Url`}
                    />
                  </Tooltip>
                  : <> </>
              }
              {
                location.pathname === '/create'
                  ? <Tooltip label="View My Urls" fontSize="md">
                    <IconButton
                      as={routerLink}
                      to="/urls"
                      size="md"
                      fontSize="2xl"
                      variant="ghost"
                      color="current"
                      icon={<FaEye />}
                      aria-label={`View All Urls`}
                    />
                  </Tooltip>
                  : <> </>
              }
              <Button
                ml={5}
                onClick={logOutzClicked}
                colorScheme="teal"
                variant="ghost"
              >
                Logout
              </Button>
            </> :
            <>
              {
                location.pathname === '/login' ?
                  <></> :
                  <Button
                    as={routerLink}
                    to="/login"
                    ml={0}
                    colorScheme="teal"
                    variant="ghost"
                  >
                    Login
                  </Button>
              }
              {
                location.pathname === '/' || location.pathname === '/register' ?
                  <></> :
                  <Button
                    as={routerLink}
                    to="/register"
                    ml={0}
                    colorScheme="teal"
                    variant="ghost"
                  >
                    Register
                  </Button>
              }
            </>
          }
        </> }
      </Box>
    </Box>
  );
};

export default NavBar;
