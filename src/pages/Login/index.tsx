import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { UserContext } from "../../providers/UserProvider";
import { postMethod } from "../../utils/fetchData";
import { CommonResponse, LoginInput, UserResponse } from "../../types";

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
        initialValues={{email: "", password: ""}}
        onSubmit={async (values, {setErrors}) => {
          try {
            const data = await postMethod<LoginInput, CommonResponse<UserResponse | string>>('/login', values);
            if (data.status === 'FAILED') {
              toast({
                title: 'Login Failed',
                description: data.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
            } else {
              const userInfo = data.data as UserResponse;
              toast({
                title: 'Successfully Logged In',
                description: `Welcome Back ${userInfo.name}`,
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
              title: 'Login Failed',
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
