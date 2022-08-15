import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import Button from '@components/Button';
import Input from '@components/Input';
import OpacityFilter from '@components/OpacityFilter';

import {
  Container,
  CreateAccount,
  CreateAccountText,
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

  const [forgotPasswordModalVisible, setModalVisibility] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // Todo: validate and login
  const login = (): void => {
    replace('Educational');
  };

  // Todo: send temporary password to email
  const forgotPassword = (): void => {
    setModalVisibility(true);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
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
            {({ errors, handleChange, handleSubmit }) => (
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
                </FormFields>

                <Button onPress={() => handleSubmit()} fill>
                  Entrar
                </Button>

                <ForgotPassword onPress={forgotPassword} activeOpacity={0.7}>
                  <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                </ForgotPassword>
              </Form>
            )}
          </Formik>
        </Container>

        <CreateAccount onPress={() => navigate('SignUp')}>
          <Icon name="log-in" size={20} color="#FFF" />
          <CreateAccountText>Criar uma conta</CreateAccountText>
        </CreateAccount>

        {forgotPasswordModalVisible && (
          <OpacityFilter>
            <ForgotPasswordModal>
              <ForgotPasswordModalText>Uma senha temporária foi enviada para o seu email.</ForgotPasswordModalText>
              <Button onPress={() => setModalVisibility(false)}>Entendi</Button>
            </ForgotPasswordModal>
          </OpacityFilter>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
