import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { Link as routerLink } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import { UserContext } from '../../providers/UserProvider';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { loading, loggedIn } = React.useContext(UserContext);
  return (
    <Wrapper>
      <Flex alignItems="center" flexDir="column" mt={100}>
        <Text fontSize="4xl" textAlign="center">Welcome to URL APP</Text>
        <Button
          mt={8}
          colorScheme="teal"
          isLoading={loading}
          as={routerLink}
          to={loggedIn ? "/urls" : "/register"}
        >
          Get Started
        </Button>
      </Flex>
    </Wrapper>
  );
};

export default Home;
