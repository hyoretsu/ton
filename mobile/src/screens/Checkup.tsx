import Icon from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';
import { range } from '@utils';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Modal from '@components/Modal';
import SymptomQuestions from '@components/SymptomQuestions';
import { useInfo } from '@context/info';
import { useStorage } from '@context/storage';

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
    const { navigate } = useNavigation();
    const { checkupProgress, symptomAnswers } = useStorage();

    const [infoModalVisible, setInfoModalVisibility] = useState(false);
    const [symptomQuestionsVisible, setSymptomQuestionsVisibility] = useState(false);
    const [thanksModalVisible, setThanksModalVisibility] = useState(false);

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
        if (Object.entries(answers).length < (Object.values(answers)[0] === 'Sim' ? 5 : 4)) {
            return;
        }

        const formData = new FormData();

        // Analisar como enviar as respostas da sintomatologia
        Object.entries(checkupProgress).forEach(([key, path]) =>
            formData.append(key, {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: (path.match(/mrousavy.*\.jpg/) as string[])[0],
            }),
        );
        formData.append('answers', JSON.stringify(answers));

        await api.post('/checkup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        await storeValue('checkupProgress', []);
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
                    width={26 * vw}
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
                        {Object.entries(symptomAnswers).length >= 5 ? (
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

                    <Button
                        background="transparent"
                        border="#fff"
                        paddingHorizontal={8 * vw}
                        paddingVertical={0.8 * vh}
                        onPress={finishCheckup}
                    >
                        Enviar
                    </Button>
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

            {thanksModalVisible && (
                <Modal
                    buttonBackground={mainTheme.colors.purple}
                    buttonBold
                    buttonText="Início"
                    buttonTextColor="#fff"
                    onConfirm={() => navigate('Home')}
                    width={80}
                >
                    {
                        'Fim do exame desta semana! 😄\n\nObrigado por sua ajuda, vamos avaliar as fotos e damos notícias pelo chat.\n\nQualquer coisa, fique à vontade para entrar em contato conosco por lá também.'
                    }
                </Modal>
            )}
        </>
    );
};

export default Checkup;
