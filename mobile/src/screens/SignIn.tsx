import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { Image } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import Button from '@components/Button';
import Input from '@components/Input';
import OpacityFilter from '@components/OpacityFilter';

import {
  Container,
  ForgotPassword,
  ForgotPasswordModal,
  ForgotPasswordModalText,
  ForgotPasswordText,
  Form,
  FormFields,
  Title,
} from '@styles/SignIn';

import logoImg from 'assets/logo.png';

const SignIn: React.FC = () => {
  const { navigate, replace } = useNavigation<NavProps<'Educational'>>();

  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotPasswordModalVisible, setModalVisibility] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // Todo: validate and login
  const login = (): void => {
    replace('Educational');
  };

  const forgotPassword = (emailError: string | undefined): void => {
    if (emailError === 'email is a required field') {
      setForgotMessage('Por favor, escreva um e-mail.');
    } else if (emailError === 'email must be a valid email') {
      setForgotMessage('Por favor, corrija seu e-mail.');
    } else {
      setForgotMessage('Uma senha temporária foi enviada para o seu email.');
      // Todo: send temporary password to email
    }

    setModalVisibility(true);
  };

  return (
    <ScrollView>
      <Container>
        <Title>e-Odontologia</Title>

        <Image source={logoImg} style={{ width: 200, height: 200 }} />

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={login}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
        >
          {({ errors, handleChange, handleSubmit, validateField }) => (
            <Form>
              <FormFields>
                <Input
                  placeholder="E-mail"
                  icon="mail"
                  onChangeText={handleChange('email')}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  isErrored={errors.email}
                  type="email-address"
                  ref={emailRef}
                />
                <Input
                  placeholder="Senha"
                  icon="lock"
                  onChangeText={handleChange('password')}
                  onSubmitEditing={() => handleSubmit()}
                  isErrored={errors.password}
                  returnKeyType="send"
                  ref={passwordRef}
                  secureTextEntry
                />

                <ForgotPassword
                  onPress={() => {
                    validateField('email');
                    forgotPassword(errors.email);
                  }}
                  activeOpacity={0.7}
                >
                  <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                </ForgotPassword>
              </FormFields>

              <Button onPress={() => handleSubmit()} style={{ marginBottom: 24 }} fill>
                Entrar
              </Button>
            </Form>
          )}
        </Formik>
      </Container>

      {forgotPasswordModalVisible && (
        <OpacityFilter>
          <ForgotPasswordModal>
            <ForgotPasswordModalText>{forgotMessage}</ForgotPasswordModalText>
            <Button onPress={() => setModalVisibility(false)}>Entendi</Button>
          </ForgotPasswordModal>
        </OpacityFilter>
      )}
    </ScrollView>
  );
};

export default SignIn;
