import { Feather as Icon } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import Button from '@components/Button';
import Modal, { ModalProps } from '@components/Modal';
import Row from '@components/Row';
import { useStorage } from '@context/storage';
import { vh, vw } from '@utils';

import mainTheme from '@theme';

import FacePain from 'assets/facePain.svg';
import FaceSad from 'assets/faceSad.svg';
import ForkKnife from 'assets/forkKnife.svg';

import {
    Container,
    Footer,
    ProgressCircle,
    Selection,
    SelectionButton,
    SelectionCircle,
    SelectionInput,
    SelectionItem,
    SelectionText,
    Symptom,
    SymptomQuestion,
    Title,
    TitleDivision,
} from './styles';

const SymptomQuestions: React.FC<Pick<ModalProps, 'onConfirm' | 'icon' | 'width'>> = ({ icon, onConfirm, width }) => {
    const { storeValue, symptomAnswers: answers, setSymptomAnswers: setAnswers } = useStorage();

    const symptomInputRef = useRef<TextInput>(null);
    const [symptomsStep, setSymptomsStep] = useState(0);
    const [question2Input, setQuestion2Input] = useState('');

    const questions = [
        'Sente ou sentiu dor na boca esta semana?',
        'Se sim, onde foi a dor?',
        'Está se alimentando normal?',
        'Reclamou de sentir a boca mais seca? Com menos saliva que o normal?',
        'Percebe que seus lábios estão ressecados?',
    ];

    const painOptions = ['Garganta', 'Dente', 'Língua', 'Gengiva', 'Lábio'];

    const eatingOptions = [
        'Sim',
        'Não, está com fastio.',
        'Não, só líquidos, como sucos, Sustagen e vitaminas.',
        'Não, só comida pastosa.',
        'Não, nem líquidos consegue tomar.',
    ];

    const finishQuestions = (): void => {
        storeValue('symptomAnswers', answers);

        onConfirm();
    };

    return (
        <Modal
            icon={icon}
            button={false}
            width={width}
            onConfirm={finishQuestions}
            style={{
                height: 90 * vh,
                paddingBottom: 3 * vh,
            }}
        >
            <Title>O paciente:</Title>
            <TitleDivision />
            <Container showsVerticalScrollIndicator={false}>
                {symptomsStep === 0 && (
                    <>
                        <FacePain height={10 * vw} width={10 * vw} />

                        <Symptom>
                            <SymptomQuestion>{questions[0]}</SymptomQuestion>
                            <Selection>
                                <SelectionItem>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[0]]: 'Sim' }))}
                                        selected={answers[questions[0]] === 'Sim'}
                                    />
                                    <SelectionText>Sim</SelectionText>
                                </SelectionItem>
                                <SelectionItem>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[0]]: 'Não' }))}
                                        selected={answers[questions[0]] === 'Não'}
                                    />
                                    <SelectionText>Não</SelectionText>
                                </SelectionItem>
                            </Selection>
                        </Symptom>

                        {answers[questions[0]] === 'Sim' && (
                            <Symptom>
                                <SymptomQuestion>{questions[1]}</SymptomQuestion>
                                <Selection style={{ flexDirection: 'column' }}>
                                    {painOptions.slice(0, painOptions.length).map((painOption, index) => {
                                        const selected = answers[questions[1]] === painOption;

                                        return (
                                            <SelectionButton
                                                background={selected ? '#fff' : 'transparent'}
                                                bold
                                                color={mainTheme.colors.purple}
                                                fill
                                                key={index}
                                                selected={selected}
                                                onPress={() => {
                                                    setQuestion2Input('');
                                                    setAnswers(old => ({ ...old, [questions[1]]: painOption }));
                                                }}
                                                style={{
                                                    marginBottom: 2 * vh,
                                                }}
                                            >
                                                {painOption}
                                            </SelectionButton>
                                        );
                                    })}

                                    <SelectionInput
                                        ref={symptomInputRef}
                                        placeholder="Outro..."
                                        placeholderTextColor={mainTheme.colors.purple}
                                        value={question2Input}
                                        onChange={e => {
                                            e.persist();
                                            setQuestion2Input(e.nativeEvent.text);
                                            setAnswers(old => ({ ...old, [questions[1]]: e.nativeEvent.text }));
                                        }}
                                        style={
                                            !!answers[questions[1]] &&
                                            !painOptions.includes(answers[questions[1]]) && {
                                                backgroundColor: mainTheme.colors.purple,
                                            }
                                        }
                                    />
                                </Selection>
                            </Symptom>
                        )}
                    </>
                )}
                {symptomsStep === 1 && (
                    <Symptom>
                        <ForkKnife height={10 * vw} width={10 * vw} />

                        <SymptomQuestion>{questions[2]}</SymptomQuestion>
                        <Selection style={{ flexDirection: 'column' }}>
                            {eatingOptions.map((eatingOption, index) => {
                                const selected = answers[questions[2]] === eatingOption;

                                return (
                                    <SelectionButton
                                        background={selected ? '#fff' : 'transparent'}
                                        bold
                                        color={mainTheme.colors.purple}
                                        fill
                                        key={index}
                                        selected={selected}
                                        onPress={() => {
                                            setQuestion2Input('');
                                            setAnswers(old => ({ ...old, [questions[2]]: eatingOption }));
                                        }}
                                        style={{
                                            marginBottom: 2 * vh,
                                        }}
                                    >
                                        {eatingOption}
                                    </SelectionButton>
                                );
                            })}
                        </Selection>
                    </Symptom>
                )}
                {symptomsStep === 2 && (
                    <>
                        <FaceSad height={10 * vw} width={10 * vw} />

                        <Symptom>
                            <SymptomQuestion>{questions[3]}</SymptomQuestion>
                            <Selection>
                                <SelectionItem>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[3]]: 'Sim' }))}
                                        selected={answers[questions[3]] === 'Sim'}
                                    />
                                    <SelectionText>Sim</SelectionText>
                                </SelectionItem>
                                <SelectionItem>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[3]]: 'Não' }))}
                                        selected={answers[questions[3]] === 'Não'}
                                    />
                                    <SelectionText>Não</SelectionText>
                                </SelectionItem>
                            </Selection>
                        </Symptom>
                        <Symptom>
                            <SymptomQuestion>{questions[4]}</SymptomQuestion>
                            <Selection>
                                <SelectionItem>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[4]]: 'Sim' }))}
                                        selected={answers[questions[4]] === 'Sim'}
                                    />
                                    <SelectionText>Sim</SelectionText>
                                </SelectionItem>
                                <SelectionItem>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[4]]: 'Não' }))}
                                        selected={answers[questions[4]] === 'Não'}
                                    />
                                    <SelectionText>Não</SelectionText>
                                </SelectionItem>
                            </Selection>
                        </Symptom>

                        <Button bold onPress={finishQuestions} style={{ marginTop: 5 * vh }}>
                            Concluir
                        </Button>
                    </>
                )}
            </Container>

            <Footer>
                <TouchableOpacity
                    onPress={() => setSymptomsStep(old => old - 1)}
                    containerStyle={{ borderRadius: 50 * vw, marginRight: 'auto' }}
                >
                    <Icon name="arrow-left" size={symptomsStep > 0 ? 6 * vw : 0} color={mainTheme.colors.purple} />
                </TouchableOpacity>

                <Row
                    style={{
                        position: 'absolute',
                        left: '46%',
                    }}
                >
                    <TouchableOpacity onPress={() => setSymptomsStep(0)}>
                        <ProgressCircle current={symptomsStep - 0} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSymptomsStep(1)} containerStyle={{ marginHorizontal: 2 * vw }}>
                        <ProgressCircle current={symptomsStep - 1} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSymptomsStep(2)}>
                        <ProgressCircle current={symptomsStep - 2} />
                    </TouchableOpacity>
                </Row>

                <TouchableOpacity
                    onPress={() => setSymptomsStep(old => old + 1)}
                    containerStyle={{ borderRadius: 50 * vw, marginLeft: 'auto' }}
                >
                    <Icon name="arrow-right" size={symptomsStep < 2 ? 6 * vw : 0} color={mainTheme.colors.purple} />
                </TouchableOpacity>
            </Footer>
        </Modal>
    );
};

export default SymptomQuestions;
