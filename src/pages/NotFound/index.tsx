import { Button } from '@chakra-ui/button';
import { Box, Heading } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Wrapper from '../../components/Wrapper';

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
  const location = useLocation();
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get('type') === 'expired' 
      ? "This message or link is expired."
      : "This message or link may not have existed."
    setMsg(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onClickMethod = () => {
    window.location.href = '/';
  }
  return (
    <Wrapper>
      <Box
        display="flex"
        flexDirection="column"
      >
        <Heading
          as="h1"
          size="4xl"
          textAlign="center"
          mt="25%"
        >
          Gone! 😮
        </Heading>
        <Heading
          size="lg"
          textAlign="center"
          mt={35}
          as="h5"
        >
          {msg}
        </Heading>
        <Button
          onClick={onClickMethod}
          mt={10}
          colorScheme="teal"
          alignSelf="center"
        >
          Go Home
        </Button>
      </Box>
    </Wrapper>
  );
};

export default NotFound;
