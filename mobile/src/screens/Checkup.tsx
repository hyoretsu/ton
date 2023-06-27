import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';
import { range } from '@utils';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Modal from '@components/Modal';
import SymptomQuestions from '@components/SymptomQuestions';
import { useInfo } from '@context/info';
import { useStorage } from '@context/storage';

import api from '@api';

import {
    CheckupText,
    CheckupTitle,
    Container,
    GenericView,
    StepCircle,
    StepNumber,
    StepView,
    SymptomsButton,
} from '@styles/Checkup';

import Checkmark from 'assets/checkmark.svg';
import { titles } from 'assets/checkup.json';
import MinLogoText from 'assets/minLogoText.svg';

const Checkup: React.FC = () => {
    const { setCurrentCheckupStep } = useInfo();
    const { goBack, navigate } = useNavigation();
    const { checkupProgress, storeValue, symptomAnswers } = useStorage();

    const [infoModalVisible, setInfoModalVisibility] = useState(false);
    const [symptomQuestionsVisible, setSymptomQuestionsVisibility] = useState(false);
    const [finishModalText, setFinishModalText] = useState('');
    const [finishModalVisible, setFinishModalVisibility] = useState(false);

    const continueCheckup = (): void => {
        if (Object.entries(checkupProgress).length === titles.length) {
            return;
        }

        let nextStep: number;

        titles.forEach((title, index) => {
            // If it's either undefined or at 0 (falsy)
            if (nextStep || nextStep === 0) {
                return;
            }

            // If there isn't a progress for this step, it's the next step
            if (!checkupProgress[title]) {
                nextStep = index;
            }
        });

        // @ts-ignore
        setCurrentCheckupStep(nextStep);
        navigate('CheckupInstructions');
    };

    const finishCheckup = async (): Promise<void> => {
        let checkupResponse = {} as AxiosResponse;
        const formData = new FormData();

        // Analisar como enviar as respostas da sintomatologia
        Object.entries(checkupProgress).forEach(([key, uri]) =>
            formData.append(key, {
                uri,
                type: 'image/jpeg',
                name: (uri.match(/cache\/(?:.*\/)Camera\/(.*.jpg)/) as string[])[1],
            }),
        );
        formData.append('answers', JSON.stringify(symptomAnswers));

        try {
            checkupResponse = await api.post('/checkup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch {
            setFinishModalText('Houve um erro inesperado! Tente novamente.');
            setFinishModalVisibility(true);
            return;
        }

        if (checkupResponse.status !== 200) {
            setFinishModalText('Houve um erro inesperado! Tente novamente.');
            setFinishModalVisibility(true);
            return;
        }

        await storeValue('checkupProgress', {});
        await storeValue('symptomAnswers', {});

        setFinishModalText(
            'Fim do exame desta semana! 😄\n\nObrigado por sua ajuda, vamos avaliar as fotos e damos notícias pelo chat.\n\nQualquer coisa, fique à vontade para entrar em contato conosco por lá também.',
        );
        setFinishModalVisibility(true);
    };

    return (
        <>
            <StatusBar backgroundColor={mainTheme.colors.purple} />
            <Container>
                <BackButton
                    size={4 * vh}
                    style={{
                        left: 5 * vw,
                        position: 'absolute',
                        top: 3 * vh,
                    }}
                />

                <MinLogoText
                    height={15 * vh}
                    width={12.5 * vh}
                    style={{
                        marginBottom: -2.5 * vh,
                        marginTop: 2.5 * vh,
                    }}
                />

                <GenericView>
                    <TouchableOpacity
                        onPress={() => setInfoModalVisibility(true)}
                        containerStyle={{
                            alignItems: 'center',
                            marginBottom: 3 * vh,
                        }}
                    >
                        <CheckupTitle>Como funciona?</CheckupTitle>
                        <CheckupText style={{ marginBottom: 0 }}>Clique aqui para saber mais!</CheckupText>
                    </TouchableOpacity>

                    <StepView>
                        {range(1, 8 + 1).map(number => (
                            <StepCircle
                                key={number}
                                onPress={() => {
                                    if (checkupProgress[titles[number - 1]]) return;

                                    setCurrentCheckupStep(number - 1);

                                    navigate('CheckupInstructions');
                                }}
                                // @ts-ignore
                                containerStyle={[
                                    {
                                        borderRadius: 50 * vw,
                                        marginBottom: 3 * vh,
                                    },
                                    ![1, 5].includes(number) && { marginLeft: 4 * vw },
                                ]}
                            >
                                {checkupProgress[titles[number - 1]] ? (
                                    <Checkmark
                                        width={8 * vw}
                                        height={4 * vh}
                                        color={mainTheme.colors.gold}
                                        style={{
                                            marginLeft: 1 * vw,
                                            marginBottom: 0.5 * vh,
                                        }}
                                    />
                                ) : (
                                    <StepNumber>{number}</StepNumber>
                                )}
                            </StepCircle>
                        ))}
                    </StepView>

                    <Button background={mainTheme.colors.gold} bold onPress={continueCheckup}>
                        Continuar
                    </Button>
                </GenericView>

                <GenericView>
                    <CheckupTitle>Sintomas</CheckupTitle>
                    <CheckupText style={{ marginTop: 1 * vh }}>
                        Clique no botão e preencha algumas perguntas para sabermos se está tudo bem.
                    </CheckupText>

                    <SymptomsButton onPress={() => setSymptomQuestionsVisibility(true)}>
                        {Object.entries(symptomAnswers).length >= 4 ? (
                            <Checkmark
                                width={15 * vw}
                                height={5 * vh}
                                color={mainTheme.colors.gold}
                                style={{
                                    marginLeft: 3 * vw,
                                    marginBottom: 1.5 * vh,
                                }}
                            />
                        ) : (
                            <Icon
                                name="edit-3"
                                size={10 * vw}
                                color={mainTheme.colors.purple}
                                style={{ marginLeft: -1, marginTop: -2 }}
                            />
                        )}
                    </SymptomsButton>

                    {Object.entries(checkupProgress).length === 8 && Object.entries(symptomAnswers).length >= 4 && (
                        <Button
                            background="transparent"
                            border="#fff"
                            paddingHorizontal={8 * vw}
                            paddingVertical={0.8 * vh}
                            onPress={finishCheckup}
                        >
                            Enviar
                        </Button>
                    )}
                </GenericView>
            </Container>

            {infoModalVisible && (
                <Modal width={80} onConfirm={() => setInfoModalVisibility(false)}>
                    {
                        'Olá, vamos checar a saúde da boca do seu filho?\n\nPara isto, vamos precisar que você tire algumas fotos da boca dele, seguindo as instruções que vão aparecer na tela e o exemplo que será mostrado.\n\nApós tirar cada foto, você poderá conferir se realmente ficou boa.\nVamos lá?\n\nAntes de tirar as fotos, gire a tela do seu celular.'
                    }
                </Modal>
            )}

            {symptomQuestionsVisible && (
                <SymptomQuestions icon={false} onConfirm={() => setSymptomQuestionsVisibility(false)} width={90} />
            )}

            {finishModalVisible && (
                <Modal
                    buttonBackground={mainTheme.colors.purple}
                    buttonBold
                    buttonText="Início"
                    buttonTextColor="#fff"
                    onConfirm={goBack}
                    width={80}
                >
                    {finishModalText}
                </Modal>
            )}
        </>
    );
};

export default Checkup;
