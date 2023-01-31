import { vh, vw } from '@units/viewport';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import Button from '@components/Button';
import Input from '@components/Input';
import Modal from '@components/Modal';
import OpacityFilter from '@components/OpacityFilter';
import { useAuth } from '@contexts/auth';

import api from '@api';

import {
    AppInfo,
    Container,
    ForgotPassword,
    ForgotPasswordText,
    Form,
    FormFields,
    SubTitleFirst,
    SubTitleSecond,
    Title,
} from '@styles/SignIn';

import Lock from 'assets/lock.svg';
import Logo from 'assets/logo.svg';
import Mail from 'assets/mail.svg';

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

    const forgotPassword = async (emailValue: string, emailError: string | undefined): Promise<void> => {
        if (!emailValue) {
            setModalMessage('Por favor, insira um email.');
        } else if (emailError === 'email must be a valid email') {
            setModalMessage('Por favor, corrija seu email.');
        } else {
            await api.post('/users/forgot_password', { email: emailValue });

            setModalMessage('Uma senha temporária foi enviada para o seu email.');
        }

        setModalVisibility(true);
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Container>
                <AppInfo>
                    <Logo width={30 * vw} height={20 * vh} />

                    <Title>TON</Title>
                    <SubTitleFirst>Telemonitoramento</SubTitleFirst>
                    <SubTitleSecond>Odontopediátrico em Oncologia</SubTitleSecond>
                </AppInfo>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={login}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().required(),
                    })}
                >
                    {({ errors, handleChange, handleSubmit, values }) => (
                        <Form>
                            <FormFields>
                                <Input
                                    background="transparent"
                                    placeholder="Email"
                                    icon={Mail}
                                    onChangeText={handleChange('email')}
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                    isErrored={errors.email}
                                    type="email-address"
                                    ref={emailRef}
                                />
                                <Input
                                    background="transparent"
                                    placeholder="Senha"
                                    icon={Lock}
                                    onChangeText={handleChange('password')}
                                    onSubmitEditing={() => handleSubmit()}
                                    isErrored={errors.password}
                                    returnKeyType="send"
                                    ref={passwordRef}
                                    secureTextEntry
                                />

                                <ForgotPassword
                                    onPress={() => forgotPassword(values.email, errors.email)}
                                    activeOpacity={0.7}
                                >
                                    <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                                </ForgotPassword>
                            </FormFields>

                            <Button onPress={() => handleSubmit()} style={{ marginTop: 6 * vh, width: 56 * vw }} fill>
                                Entrar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>

            {modalVisible && (
                <OpacityFilter>
                    <Modal buttonText="Entendi" onConfirm={() => setModalVisibility(false)}>
                        {modalMessage}
                    </Modal>
                </OpacityFilter>
            )}
        </ScrollView>
    );
};

export default SignIn;
