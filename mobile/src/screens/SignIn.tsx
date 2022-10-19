import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { Image } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import Button from '@components/Button';
import Input from '@components/Input';
import OpacityFilter from '@components/OpacityFilter';
import { useAuth } from '@contexts/auth';

import api from '@api';

import {
    Container,
    ForgotPassword,
    ForgotPasswordText,
    Form,
    FormFields,
    Modal,
    ModalText,
    Title,
} from '@styles/SignIn';

import logoImg from 'assets/logo.png';

interface FormTypes {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const { finishLogin } = useAuth();

    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisibility] = useState(false);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const login = async (credentials: FormTypes): Promise<void> => {
        try {
            const res = await api.post('/users/login', credentials);

            await finishLogin(res.data);
        } catch {
            setModalMessage('E-mail e/ou senha incorretos.');

            setModalVisibility(true);
        }
    };

    const forgotPassword = (emailError: string | undefined): void => {
        if (emailError === 'email is a required field') {
            setModalMessage('Por favor, escreva um e-mail.');
        } else if (emailError === 'email must be a valid email') {
            setModalMessage('Por favor, corrija seu e-mail.');
        } else {
            setModalMessage('Uma senha temporária foi enviada para o seu email.');
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

            {modalVisible && (
                <OpacityFilter>
                    <Modal>
                        <ModalText>{modalMessage}</ModalText>
                        <Button onPress={() => setModalVisibility(false)}>Entendi</Button>
                    </Modal>
                </OpacityFilter>
            )}
        </ScrollView>
    );
};

export default SignIn;
