import React from "react"
import { Box } from "@chakra-ui/react"

interface WrapperProps {
  variant?: 'small' | 'regular',
  mt?: number,
  width?: string,
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant='regular',
  width="75%",
  mt=4,
}) => {
  return (
    <Box
      mt={mt}
      mx="auto"
      maxW={variant === 'regular' ? "800px" : "400px"}
      w={width}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
