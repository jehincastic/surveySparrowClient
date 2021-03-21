import { Button, IconButton, Tooltip, useClipboard, useToast } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { BsChatSquareQuote, BsLink45Deg } from 'react-icons/bs';
import { Container, Text } from '@chakra-ui/layout';
import React from 'react';

interface SingleItemProps {
  url: string;
  isActive: boolean;
  expiresAt: Date;
  type: string;
  isMobile: boolean;
  isSmallDevices: boolean;
}

const SingleItem: React.FC<SingleItemProps> = ({
  url,
  isActive,
  expiresAt,
  type,
  isMobile,
  isSmallDevices,
}) => {
  const toast = useToast();
  const urlToGo = `${window.location.protocol}//${window.location.host}/${url}`;
  const displayUrl = isMobile ? `/${url}` : urlToGo;
  const { onCopy } = useClipboard(urlToGo);
  const copyUrl = () => {
    if (isActive) {
      onCopy();
      toast({
        title: 'Link Copied to Clipboard.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } else {
      toast({
        title: 'This link is expired.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const goToUrl = () => {
    if (isActive) {
      window.open(urlToGo, '_blank');
    }
  }
  return (
    <Container
      display="flex"
      flexDir="row"
      width="100%"
      maxW="100%"
      rowSpan={1}
      my={2.5}
      py={6}
      fontSize={["sm", "md", "lg", "xl"]}
    >
      <Text
        color={isActive ? 'green.300' : 'red.300'}
        as="b"
        mt="auto"
        mb="auto"
        pr={15}
        fontSize={isSmallDevices ? 'md' : 'xl'}
      >
        ● {isActive ? 'ACTIVE' : 'Expired'}
      </Text>
      <Button
        pr={15}
        mt="auto"
        mb="auto"
        width={isSmallDevices ? "35%" : "50%"}
        disabled={!isActive}
        onClick={copyUrl}
        colorScheme="teal"
        variant="ghost"
        fontSize={isMobile ? '2xl' : 'xl'}
      >
        {displayUrl}
      </Button>
      {!isMobile 
        ? <Text
            width="18%"
            as="b"
            pr={15}
            textAlign="center"
          >
            {expiresAt.toLocaleDateString('en-GB')}
            <br />
            <Text
              as="em"
              textAlign="center"
            >
              {expiresAt.toLocaleTimeString()}
            </Text>
          </Text>
        : null
      }
      <span style={{margin: 'auto'}}>
        <Tooltip label={type === 'LINK' ? 'URL' : 'Message'} fontSize="md">
          <IconButton
            size="md"
            fontSize="2xl"
            variant="ghost"
            color="current"
            mr="5"
            icon={type === 'LINK' ? <BsLink45Deg /> : <BsChatSquareQuote />}
            aria-label={type === 'LINK' ? 'URL' : 'Message'}
          />
        </Tooltip>
        <Tooltip label="Go to Url" fontSize="md">
          <IconButton
            disabled={!isActive}
            size="md"
            fontSize="2xl"
            variant="ghost"
            color="current"
            onClick={goToUrl}
            icon={<FaChevronRight />}
            aria-label={`Go to the Url`}
          />
        </Tooltip>
      </span>
    </Container>
  );
};

export default SingleItem;
