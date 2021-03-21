import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useToast } from '@chakra-ui/toast';
import { Button } from '@chakra-ui/button';
import { Skeleton } from '@chakra-ui/skeleton';
import {
  Paginator,
  Previous,
  Next,
  PageGroup,
  Container,
} from 'chakra-paginator';

import Wrapper from '../../components/Wrapper';
import { UserContext } from '../../providers/UserProvider';
import SingleItem from '../../components/SingleItem';
import { MessageResponse, CommonResponse, AllMsgType } from '../../types';
import { getMethod } from '../../utils/fetchData';
import TitleCol from '../../components/TitleCol';
import { ButtonProps } from '@chakra-ui/react';

interface URLProps {}

const Urls: React.FC<URLProps> = () => {
  const isMobile = window.innerWidth < 760;
  const isSmallDevices = window.innerWidth < 450;
  const [dataLoading, setDataLoading] = useState(true);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const { loggedIn, loading, setLoggedIn } = React.useContext(UserContext);
  const toast = useToast();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const outerLimit: number = isSmallDevices ? 1 : isMobile ? 3 : 4;
  const innerLimit: number = isSmallDevices ? 1 : isMobile ? 3 : 4;
  useEffect(() => {
    async function fetchMessages() {
      const data = await getMethod<CommonResponse<AllMsgType>>(`/message/${currentPage}`);
      if (data.status === 'FAILED') {
        setLoggedIn(false);
      } else {
        setTotalPages(Math.ceil(data.data.count / 5));
        setMessages(data.data.messages);
      }
      setDataLoading(false);
    };
    if (!loading) {
      fetchMessages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])
  if (!loggedIn && !loading) {
    toast({
      title: 'Please Login To Continue',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
    history.push('/login');
  }
  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
    setDataLoading(true);
  };
  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: "sm",
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    bg: "green.300",
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: "gray.200",
  };
  return (
    <Wrapper width="100%">
      <Flex alignItems="center" flexDir="column" width="100%" mt={5} mb={10}>
        <Text fontSize="4xl" textAlign="center" mb={5}>Your Urls</Text>
        {
          dataLoading
          ? <>
            <Stack mb={10}>
              <Skeleton height="20px" width="50vw" />
              <Skeleton height="20px" width="50vw" />
              <Skeleton height="20px" width="50vw" />
            </Stack>
            <Stack mb={10}>
              <Skeleton height="20px" width="50vw" />
              <Skeleton height="20px" width="50vw" />
              <Skeleton height="20px" width="50vw" />
            </Stack>
            <Stack mb={10}>
              <Skeleton height="20px" width="50vw" />
              <Skeleton height="20px" width="50vw" />
              <Skeleton height="20px" width="50vw" />
            </Stack>
          </>
          : messages.length > 0 
            ? <>
              <TitleCol isMobile={isMobile} isSmallDevices={isSmallDevices} />
              {
                messages.map(msg => (
                  <SingleItem
                    key={msg.id}
                    type={msg.type}
                    url={msg.url}
                    expiresAt={new Date(msg.expiresAt)}
                    isActive={!msg.expired}
                    isMobile={isMobile}
                    isSmallDevices={isSmallDevices}
                  />
                ))
              }
              <Paginator
                isDisabled={false}
                activeStyles={activeStyles}
                innerLimit={innerLimit}
                outerLimit={outerLimit}
                currentPage={currentPage}
                normalStyles={normalStyles}
                separatorStyles={separatorStyles}
                pagesQuantity={totalPages}
                onPageChange={handlePageChange}
              >
                <Container align="center" justify="space-between" w="full" p={4}>
                  <Previous bg="green.300">
                    Previous
                  </Previous>
                  <PageGroup isInline align="center" />
                  <Next bg="green.300">
                    Next
                  </Next>
                </Container>
              </Paginator>
            </>
            : <>
              <Heading size="xl" mt={10}>No URLS Found</Heading>
              <Button
                as={Link}
                to="/create"
                mt={5}
                colorScheme="teal"
              >
                Create One
              </Button>
            </>
        }
      </Flex>
    </Wrapper>
  );
};

export default Urls;
