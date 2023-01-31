/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import { vh, vw } from '@units/viewport';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import mainTheme from 'ui/theme/main';
import * as Yup from 'yup';

import Button from '@components/Button';
import Input from '@components/Input';
import Modal from '@components/Modal';
import OpacityFilter from '@components/OpacityFilter';
import PatientPhoto from '@components/PatientPhoto';
import { useAuth } from '@contexts/auth';

import api from '@api';

import {
    CloseButton,
    Container,
    ContentView,
    EditPhotoText,
    EditPhotoView,
    EditTitle,
    Form,
    PhotoView,
} from '@styles/EditProfile';

import EditSvg from 'assets/edit.svg';

interface FormTypes {
    city: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const EditProfile: React.FC = () => {
    const { updateUser, user } = useAuth();
    const { goBack } = useNavigation();

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
            <StatusBar backgroundColor={mainTheme.colors.purple} />

            <Container>
                <ScrollView
                    contentContainerStyle={[
                        {
                            justifyContent: 'space-between',
                            paddingBottom: 13 * vh,
                            paddingHorizontal: 8 * vw,
                            paddingTop: 8 * vh,
                            height: 100 * vh,
                        },
                    ]}
                >
                    <CloseButton onPress={goBack}>
                        <Icon name="x-circle" size={10 * vw} color="#fff" />
                    </CloseButton>

                    <PhotoView>
                        <PatientPhoto
                            size={23 * vw}
                            background="#fff"
                            style={{
                                height: 36 * vw,
                                width: 36 * vw,
                            }}
                        />
                        {/* <EditPhotoView>
                            <EditPhotoText>Editar foto</EditPhotoText>
                            <EditSvg width={5 * vw} />
                        </EditPhotoView> */}
                    </PhotoView>

                    <ContentView>
                        <EditTitle>Editar perfil</EditTitle>

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
                                    <Input
                                        placeholder="E-mail"
                                        icon="mail"
                                        iconSize={6 * vw}
                                        iconDivider={false}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onSubmitEditing={() => passwordRef.current?.focus()}
                                        isErrored={errors.email}
                                        type="email-address"
                                        ref={emailRef}
                                        squared
                                    />
                                    <Input
                                        placeholder="Senha"
                                        icon="lock"
                                        iconSize={6 * vw}
                                        iconDivider={false}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onSubmitEditing={() => phoneRef.current?.focus()}
                                        isErrored={errors.password}
                                        ref={passwordRef}
                                        secureTextEntry
                                        squared
                                    />
                                    <Input
                                        placeholder="Telefone"
                                        icon="phone"
                                        iconSize={6 * vw}
                                        iconDivider={false}
                                        value={values.phoneNumber}
                                        onChangeText={handleChange('phoneNumber')}
                                        onSubmitEditing={() => cityRef.current?.focus()}
                                        isErrored={errors.phoneNumber}
                                        ref={phoneRef}
                                        keyboardType="phone-pad"
                                        squared
                                    />
                                    <Input
                                        placeholder="Cidade"
                                        icon="map-pin"
                                        iconSize={6 * vw}
                                        iconDivider={false}
                                        value={values.city}
                                        onChangeText={handleChange('city')}
                                        onSubmitEditing={() => handleSubmit()}
                                        isErrored={errors.city}
                                        ref={cityRef}
                                        returnKeyType="send"
                                        squared
                                    />

                                    <Button
                                        background={mainTheme.colors.gold}
                                        bold
                                        onPress={() => handleSubmit()}
                                        style={{ marginBottom: 12 }}
                                    >
                                        Enviar
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </ContentView>
                </ScrollView>
            </Container>

            {modalVisible && (
                <OpacityFilter>
                    <Modal buttonText="Voltar" onConfirm={goBack}>
                        Dados alterados com sucesso!
                    </Modal>
                </OpacityFilter>
            )}
        </>
    );
};

export default EditProfile;
