import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { differenceInDays, endOfYesterday, format } from 'date-fns';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import Button from '@components/Button';
import Input from '@components/Input';

import {
  Container,
  Title,
  Form,
  FormFields,
  Birthdate,
  BackToSignIn,
  BackToSignInText,
  BirthdateText,
  BirthdatePhone,
} from '@styles/SignUp';

const SignUp: React.FC = () => {
  const { goBack, navigate } = useNavigation();

  const patientNameRef = useRef<TextInput>(null);
  const parentNameRef = useRef<TextInput>(null);
  const telephoneRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [showBirthdate, setShowBirthdate] = useState(false);

  // Todo: create account
  const createAccount = (): void => {
    navigate('Educational');
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
      <Container>
        <Title>Faça o seu cadastro</Title>

        <Formik
          initialValues={{
            patientName: '',
            parentName: '',
            birthdate: new Date(),
            phone: '',
            city: '',
            email: '',
            password: '',
          }}
          onSubmit={createAccount}
          validationSchema={Yup.object().shape({
            patientName: Yup.string().required(),
            parentName: Yup.string().required(),
            birthdate: Yup.date().required(),
            phone: Yup.string().min(10).max(13).required(),
            city: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
        >
          {({ errors, handleChange, handleSubmit, setFieldValue, values }) => (
            <Form>
              <FormFields>
                <Input
                  placeholder="Nome do(a) paciente"
                  icon="user"
                  onChangeText={handleChange('patientName')}
                  onSubmitEditing={() => parentNameRef.current?.focus()}
                  isErrored={errors.patientName}
                  ref={patientNameRef}
                />

                <Input
                  placeholder="Nome do(a) responsável"
                  icon="user"
                  onChangeText={handleChange('parentName')}
                  onSubmitEditing={() => setShowBirthdate(true)}
                  isErrored={errors.parentName}
                  ref={parentNameRef}
                />

                <BirthdatePhone>
                  {/* Todo: add red highlighting when errored */}
                  <Birthdate onPress={() => setShowBirthdate(true)}>
                    <Icon name="calendar" size={20} color="#708fe5" />
                    <BirthdateText>
                      {differenceInDays(values.birthdate, new Date())
                        ? format(values.birthdate, 'd/M/yyyy')
                        : 'Nascimento'}
                    </BirthdateText>
                  </Birthdate>
                  {showBirthdate && (
                    <DateTimePicker
                      mode="date"
                      dateFormat="shortdate"
                      value={values.birthdate}
                      maximumDate={endOfYesterday()}
                      onChange={(_, date) => {
                        setShowBirthdate(false);
                        setFieldValue('birthdate', date);
                        telephoneRef.current?.focus();
                      }}
                    />
                  )}

                  <Input
                    placeholder="Telefone"
                    icon="phone"
                    onChangeText={handleChange('phone')}
                    onSubmitEditing={() => cityRef.current?.focus()}
                    isErrored={errors.phone}
                    ref={telephoneRef}
                    keyboardType="phone-pad"
                    // mask="(99) 99999-9999"
                    style={{ width: '65%' }}
                  />
                </BirthdatePhone>

                <Input
                  placeholder="Cidade"
                  icon="map-pin"
                  onChangeText={handleChange('city')}
                  onSubmitEditing={() => emailRef.current?.focus()}
                  isErrored={errors.city}
                  ref={cityRef}
                />

                <Input
                  placeholder="E-mail"
                  icon="mail"
                  onChangeText={handleChange('email')}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  isErrored={errors.email}
                  ref={emailRef}
                  type="email-address"
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
              </FormFields>

              <Button onPress={() => handleSubmit()} fill>
                Criar Conta
              </Button>
            </Form>
          )}
        </Formik>
      </Container>

      <BackToSignIn onPress={goBack}>
        <Icon name="arrow-left" size={20} color="#FFF" />
        <BackToSignInText>Voltar para Login</BackToSignInText>
      </BackToSignIn>
    </ScrollView>
  );
};

export default SignUp;
