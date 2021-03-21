import { Container, Text } from '@chakra-ui/layout';
import React from 'react';

interface TitleColProps {
  isMobile: boolean;
  isSmallDevices: boolean;
}

const TitleCol: React.FC<TitleColProps> = ({
  isMobile,
  isSmallDevices,
}) => {
  return (
    <Container
      display="flex"
      flexDir="row"
      width="100%"
      maxW="100%"
      rowSpan={1}
      py={2}
      fontWeight="bold"
      fontSize={["sm", "md", "lg", "xl"]}
    >
      <Text
        textAlign="center"
        pr={15}
        fontSize="lg"
      >
        STATUS
      </Text>
      <Text
        pr={15}
        textAlign="center"
        width={isSmallDevices ? "35%" : "50%"}
        fontSize="lg"
      >
        URL
      </Text>
      {!isMobile 
        ? <Text
            width="18%"
            pr={15}
            textAlign="center"
          >
            Expires At
          </Text>
        : null
      }
      <span style={{margin: 'auto'}}>
      </span>
    </Container>
  );
};

export default TitleCol;
