import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import Button from '@components/Button';
import Input from '@components/Input';
import Modal from '@components/Modal';
import { useAuth } from '@context/auth';
import { vh, vw } from '@utils';

import api from '@api';

import Lock from '@assets/lock.svg';
import Logo from '@assets/logo.svg';
import Mail from '@assets/mail.svg';

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
} from './styles';

interface FormTypes {
    email: string;
    password: string;
}

export default function SignIn() {
    const { finishLogin } = useAuth();

    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisibility] = useState(false);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const login = async (credentials: FormTypes): Promise<void> => {
        try {
            const { data } = await api.post('/users/login', credentials);

            await finishLogin(data);

            const notFirstLaunch = await AsyncStorage.getItem('@ton:launchedBefore');
            if (!notFirstLaunch) {
                const body = 'Apresentação Ton';

                await Notifications.scheduleNotificationAsync({
                    content: {
                        body,
                        data: {
                            url: `ton://Chat?content=${body}`,
                        },
                    },
                    trigger: null,
                });

                await AsyncStorage.setItem('@ton:launchedBefore', 'true');
            }

            router.replace('/');
        } catch (e) {
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
                <Modal buttonText="Entendi" onConfirm={() => setModalVisibility(false)}>
                    {modalMessage}
                </Modal>
            )}
        </ScrollView>
    );
}
