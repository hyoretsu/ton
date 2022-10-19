import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import BottomBar from '@components/BottomBar';
import Input from '@components/Input';
import OpacityFilter from '@components/OpacityFilter';
import { useAuth } from '@contexts/auth';

import api from '@api';

import { Container, Form, FormFields, Modal, ModalText, Title } from '@styles/Profile';

import Button from '../ui/components/Button';

interface FormTypes {
    city: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const Profile: React.FC = () => {
    const { updateUser, user } = useAuth();

    const cityRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const [modalVisible, setModalVisibility] = useState(false);

    const updateProfile = async (data: FormTypes): Promise<void> => {
        const changedData = Object.entries(data).reduce((obj, [key, value]) => {
            if (key === 'password' ? value !== '' : value !== user[key]) {
                return {
                    ...obj,
                    [key]: value,
                };
            }

            return obj;
        }, {});
        if (Object.entries(changedData).length === 0) return;

        const { data: updatedUser } = await api.patch('/users', changedData);
        updateUser(updatedUser);

        setModalVisibility(true);
    };

    return (
        <>
            <Container contentContainerStyle={{ alignItems: 'center' }}>
                <Title>Editar perfil</Title>
                <Formik
                    initialValues={{
                        city: user.city,
                        email: user.email,
                        password: '',
                        phoneNumber: user.phoneNumber,
                    }}
                    onSubmit={updateProfile}
                    validationSchema={Yup.object().shape({
                        city: Yup.string().required(),
                        email: Yup.string().email().required(),
                        password: Yup.string(),
                        phoneNumber: Yup.string().min(10).max(13).required(),
                    })}
                >
                    {({ errors, handleChange, handleSubmit, values }) => (
                        <Form>
                            <FormFields>
                                <Input
                                    placeholder="E-mail"
                                    icon="mail"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                    isErrored={errors.email}
                                    type="email-address"
                                    ref={emailRef}
                                />
                                <Input
                                    placeholder="Senha"
                                    icon="lock"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onSubmitEditing={() => phoneRef.current?.focus()}
                                    isErrored={errors.password}
                                    ref={passwordRef}
                                    returnKeyType="send"
                                    secureTextEntry
                                />
                                <Input
                                    placeholder="Telefone"
                                    icon="phone"
                                    value={values.phoneNumber}
                                    onChangeText={handleChange('phoneNumber')}
                                    onSubmitEditing={() => cityRef.current?.focus()}
                                    isErrored={errors.phoneNumber}
                                    ref={phoneRef}
                                    keyboardType="phone-pad"
                                />
                                <Input
                                    placeholder="Cidade"
                                    icon="map-pin"
                                    value={values.city}
                                    onChangeText={handleChange('city')}
                                    onSubmitEditing={handleSubmit}
                                    isErrored={errors.city}
                                    ref={cityRef}
                                />
                            </FormFields>

                            <Button onPress={() => handleSubmit()} style={{ marginBottom: 12 }}>
                                Enviar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
            <BottomBar />

            {modalVisible && (
                <OpacityFilter>
                    <Modal>
                        <ModalText>Informações editadas com sucesso.</ModalText>
                        <Button onPress={() => setModalVisibility(false)}>Entendi</Button>
                    </Modal>
                </OpacityFilter>
            )}
        </>
    );
};

export default Profile;
