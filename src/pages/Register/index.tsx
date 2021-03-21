import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { UserContext } from "../../providers/UserProvider";
import { postMethod } from "../../utils/fetchData";
import { CommonResponse, RegisterInput, UserResponse } from "../../types";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { loggedIn, setLoggedIn, setUserInfo, loading } = React.useContext(UserContext);
  const toast = useToast();
  const history = useHistory();
  if (loggedIn) {
    history.push('/urls');
  }
  return (
    <Wrapper variant="small" mt={100}>
      <Formik
        initialValues={{email: "", password: "", name: ""}}
        onSubmit={async (values, {setErrors}) => {
          try {
            const data = await postMethod<RegisterInput, CommonResponse<UserResponse | string>>('/register', values);
            if (data.status === 'FAILED') {
              toast({
                title: 'Registration Failed',
                description: data.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
            } else {
              const userInfo = data.data as UserResponse;
              toast({
                title: 'Successfully Registered',
                description: `Welcome ${userInfo.name}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
              setUserInfo(userInfo);
              setLoggedIn(true);
            }
          } catch (err) {
            toast({
              title: 'Registration Failed',
              description: 'Internal Server Error',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
          }
        }}
      > 
        {({isSubmitting}) => (
          <Form>
            <InputField
              name='email'
              placeholder='email@something.com'
              label='Email'
              type='email'
              required={true}
            />
            <InputField
              name='name'
              placeholder='Name'
              label='Name'
              type='text'
              required={true}
            />
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='Password'
                label='Password'
                type='password'
                required={true}
              />
            </Box>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting || loading}
              type='submit'
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
