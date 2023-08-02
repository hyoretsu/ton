import { API_URL } from '@env';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DentalPhoto } from 'backend';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { useInfo } from '@context/info';

import api from '@api';

import { Container, Example, Header, Instructions, InstructionsText, StepTitle } from '@styles/CheckupInstructions';
import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';

import { instructions, titles } from 'assets/checkup.json';
import MinLogoText from 'assets/minLogoText.svg';

const CheckupInstructions: React.FC = () => {
    const { currentCheckupStep, setCurrentCheckupStep } = useInfo();
    const { navigate } = useNavigation();

    const [example, setExample] = useState<DentalPhoto>({} as DentalPhoto);
    const [instructionsVisible, showInstructions] = useState(false);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.post('/checkup/photos/find', { category: titles[currentCheckupStep] });

            setExample(data);
        };

        execute();
    }, [currentCheckupStep]);

    return (
        <>
            <StatusBar backgroundColor={mainTheme.colors.purple} />

            <Container>
                <Header>
                    <BackButton
                        size={4 * vh}
                        style={{
                            alignSelf: 'flex-start',
                        }}
                    />

                    <Instructions>
                        <TouchableOpacity
                            onPress={() => showInstructions(true)}
                            containerStyle={{ borderRadius: 50 * vw }}
                        >
                            <Icon name="help-circle" size={6 * vw} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showInstructions(true)}>
                            <InstructionsText>Instruções</InstructionsText>
                        </TouchableOpacity>
                    </Instructions>

                    <MinLogoText
                        height={6 * vh}
                        width={10 * vw}
                        style={{
                            marginTop: -2 * vh,
                        }}
                    />
                </Header>

                <StepTitle>{`${currentCheckupStep + 1} - ${titles[currentCheckupStep]}`}</StepTitle>

                <Example source={example && { uri: `${API_URL}/files/${example.fileName}` }} />

                <Button
                    background={mainTheme.colors.gold}
                    bold
                    onPress={() => navigate('CheckupCamera')}
                    style={{ marginTop: 5 * vh }}
                >
                    Tirar foto
                </Button>

                <Button
                    border="#fff"
                    onPress={() => {
                        setCurrentCheckupStep(0);
                        navigate('Checkup');
                    }}
                    style={{
                        marginBottom: 'auto',
                        marginTop: 'auto',
                    }}
                >
                    Fazer depois
                </Button>
            </Container>

            {instructionsVisible && (
                <Modal
                    width={80}
                    buttonBackground={mainTheme.colors.purple}
                    buttonTextColor="#fff"
                    onConfirm={() => showInstructions(false)}
                >
                    {instructions[currentCheckupStep]}
                </Modal>
            )}
        </>
    );
};

export default CheckupInstructions;
