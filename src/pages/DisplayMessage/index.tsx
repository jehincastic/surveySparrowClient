import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from "@chakra-ui/react"

import Wrapper from '../../components/Wrapper';
import { CommonResponse, MessageResponse } from '../../types';
import { getMethod } from '../../utils/fetchData';

interface DisplayMessageProps {}

const DisplayMessage: React.FC<DisplayMessageProps> = () => {
  const [message, setMessage] = useState<MessageResponse | null>(null);
  const [expiresOn, setExpiresOn] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    seconds: 0
  });
  const params = useParams() as { id: string; };
  const history = useHistory();
  const convertMS = (milliseconds: number) => {
    let day;
    let hour;
    let minute;
    let seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
      day,
      hour,
      minute,
      seconds,
    };
  }
  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function fetchInfo() {
      const data = await getMethod<CommonResponse<MessageResponse | string>>(`/view/${params.id}`);
      if (data.status === 'SUCCESS') {
        const msgInfo = data.data as MessageResponse;
        if (msgInfo.type === 'LINK') {
          window.location.href = msgInfo.content;
        } else {
          const expiryTime = msgInfo.expiresAt;
          setMessage(msgInfo);
          interval = setInterval(() => {
            const newTime = expiryTime - Date.now();
            if (newTime <= 0) {
              clearInterval(interval);
              window.location.href = '/notFound?type=expired';
            }
            setExpiresOn(convertMS(newTime));
          }, 1000);
        }
      } else {
        const { data: msg } = data;
        if (msg === 'Link Expired') {
          history.push('/notFound?type=expired');
        } else {
          history.push('/notFound?type=notfound');
        }
      }
    }
    fetchInfo();
    return () => {
      
      if (interval) {
        clearInterval(interval);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickMethod = () => {
    window.location.href = '/';
  }
  return (
    <>
      {
        message ?
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
                {message.content}
              </Heading>
              <Heading
                size="lg"
                textAlign="center"
                mt={35}
                as="h5"
              >
                Create on for yourself get started <Link onClick={onClickMethod}>here</Link>.
              </Heading>
              <Flex justifyContent="center" mt={10}>
                <Text as='span'>Message will disappear in&nbsp;</Text>
                {expiresOn.day && expiresOn.day > 0 ? <Text as='span'>{expiresOn.day}d&nbsp;</Text> : null}
                {expiresOn.hour && expiresOn.hour > 0 ? <Text as='span'>{expiresOn.hour}h&nbsp;</Text> : null}
                {expiresOn.minute && expiresOn.minute > 0 ? <Text as='span'>{expiresOn.minute}m&nbsp;</Text> : null}
                {expiresOn.seconds && expiresOn.seconds > 0 ? <Text as='span'>{expiresOn.seconds}s</Text> : null}
              </Flex>
            </Box>
          </Wrapper>
          : null
      }
    </>
  );
};

export default DisplayMessage;
