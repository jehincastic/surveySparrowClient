import { Button } from '@chakra-ui/button';
import { useClipboard, useDisclosure } from '@chakra-ui/hooks';
import { Box, Heading } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal';
import { Select } from '@chakra-ui/select';
import { useToast } from '@chakra-ui/toast';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { UserContext } from '../../providers/UserProvider';
import { MessageResponse, CommonResponse, MessageInput } from '../../types';
import { postMethod } from '../../utils/fetchData';

interface CreateUrlProps {}

const CreateUrl: React.FC<CreateUrlProps> = () => {
  const [url, setUrl] = useState('');
  const { onCopy } = useClipboard(url);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loggedIn, loading } = React.useContext(UserContext);
  const toast = useToast();
  const history = useHistory();
  const handleCopy = () => {
    onCopy();
    onClose();
  };
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
  return (
    <Wrapper variant="small" mt={100}>
      <Formik
        initialValues={{content: "", type: "MESSAGE", expiresAt: "10"}}
        onSubmit={async ({content, type, expiresAt}, {resetForm}) => {
          try {
            const data = await postMethod<MessageInput, CommonResponse<MessageResponse | string>>('/message/create', {
              content,
              type,
              expiresAt: Number(expiresAt),
            });
            if (data.status === 'FAILED') {
              toast({
                title: 'Failed to create a new url',
                description: data.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
            } else {
              const { url } = data.data as MessageResponse;
              setUrl(`${window.location.protocol}//${window.location.host}/${url}`);
              onOpen();
              resetForm();
            }
          } catch (err) {
            toast({
              title: 'Server Error Please Try Again',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
          }
        }}
      > 
        {({isSubmitting, setFieldValue, values}) => (
          <Form>
            <InputField
              name='content'
              placeholder={`Enter your ${values.type === 'MESSAGE' ? 'Message' : 'URL'} here`}
              label={values.type === 'MESSAGE' ? 'Message' : 'URL'}
              type="text"
              required
            />
            <Box mt={4}>
              <Select
                variant="flushed"
                name='type'
                value={values.type}
                onChange={(e) => {
                  setFieldValue('type', e.target.value, true);
                }}
                required
              >
                <option value="MESSAGE">Message</option>
                <option value="LINK">URL</option>
              </Select>
            </Box>
            <Box mt={4}>
              <Select
                variant="flushed"
                name='expiresAt'
                required
                value={values.expiresAt}
                onChange={(e) => {
                  setFieldValue('expiresAt', e.target.value, true);
                }}
              >
                <option value="1">1 Minute</option>
                <option value="10">10 Minutes</option>
                <option value="30">30 Minute</option>
                <option value="45">45 Minute</option>
                <option value="60">1 Hour</option>
              </Select>
            </Box>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting || loading}
              type='submit'
            >
              Create New Url
            </Button>
          </Form>
        )}
      </Formik>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Url Created Successfully</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="xl" as="h3" textAlign="center">
              Your message has been created!
            </Heading>
            <br />
            <Button
              onClick={() => {
                window.open(url, '_blank');
                onClose();
              }}
              colorScheme="teal"
              variant="ghost"
              width="100%"
            >
              {url}
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleCopy}
              variant="ghost"
            >
              Copy Url
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default CreateUrl;
