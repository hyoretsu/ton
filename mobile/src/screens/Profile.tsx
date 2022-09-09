import { Formik } from 'formik';
import { useRef } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import BottomBar from '@components/BottomBar';
import Input from '@components/Input';

import Button from '../ui/components/Button';
import { Container, Form, FormFields, Title } from '../ui/styles/Profile';

const Profile: React.FC = () => {
  const cityRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const updateProfile = async (): Promise<void> => {};

  return (
    <>
      <Container contentContainerStyle={{ alignItems: 'center' }}>
        <Title>Editar perfil</Title>
        {/* Email, senha, telefone, cidade */}
        <Formik
          initialValues={{ city: '', email: '', password: '', phone: '' }}
          onSubmit={updateProfile}
          validationSchema={Yup.object().shape({
            city: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            phone: Yup.string().min(10).max(13).required(),
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
                  onSubmitEditing={handleSubmit}
                  isErrored={errors.password}
                  ref={passwordRef}
                  returnKeyType="send"
                  secureTextEntry
                />
                <Input
                  placeholder="Telefone"
                  icon="phone"
                  onChangeText={handleChange('phone')}
                  onSubmitEditing={() => cityRef.current?.focus()}
                  isErrored={errors.phone}
                  ref={phoneRef}
                  keyboardType="phone-pad"
                />
                <Input
                  placeholder="Cidade"
                  icon="map-pin"
                  onChangeText={handleChange('city')}
                  onSubmitEditing={() => emailRef.current?.focus()}
                  isErrored={errors.city}
                  ref={cityRef}
                />
              </FormFields>

              <Button style={{ marginBottom: 12 }}>Enviar</Button>
            </Form>
          )}
        </Formik>
      </Container>
      <BottomBar />
    </>
  );
};

export default Profile;
