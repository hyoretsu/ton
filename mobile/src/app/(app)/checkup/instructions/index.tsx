import { Feather as Icon } from '@expo/vector-icons';
import { DentalPhoto } from 'backend';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { useInfo } from '@context/info';
import { vh, vw } from '@utils';

import api from '@api';

import mainTheme from '@theme';

import { instructions, titles } from 'assets/checkup.json';
import MinLogoText from 'assets/minLogoText.svg';

import { Container, Example, Header, Instructions, InstructionsText, StepTitle } from './styles';

export default function CheckupInstructions() {
    const { currentCheckupStep, setCurrentCheckupStep } = useInfo();

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

                <Example source={example && { uri: `${process.env.API_URL}/files/${example.fileName}` }} />

                <Button
                    background={mainTheme.colors.gold}
                    bold
                    onPress={() => router.push('/checkup/camera')}
                    style={{ marginTop: 5 * vh }}
                >
                    Tirar foto
                </Button>

                <Button
                    border="#fff"
                    onPress={() => {
                        setCurrentCheckupStep(0);
                        router.push('/checkup');
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
}
