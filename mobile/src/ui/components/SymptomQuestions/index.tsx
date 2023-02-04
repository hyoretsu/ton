import { vh } from '@units/viewport';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import mainTheme from 'ui/theme/main';

import Modal, { ModalProps } from '@components/Modal';
import { useStorage } from '@contexts/storage';

import {
    Container,
    Selection,
    SelectionCircle,
    SelectionColumn,
    SelectionInput,
    SelectionItem,
    SelectionRow,
    SelectionText,
    Symptom,
    SymptomQuestion,
    Title,
    TitleDivision,
} from './styles';

const SymptomQuestions: React.FC<Pick<ModalProps, 'onConfirm' | 'icon' | 'width'>> = ({ icon, onConfirm, width }) => {
    const { storeValue } = useStorage();

    const symptomInputRef = useRef<TextInput>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [question2Input, setQuestion2Input] = useState('');

    const questions = [
        'Sentiu dor na boca esta semana?',
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
        if (Object.values(answers).length >= 4) {
            storeValue('checkupAnswers', answers);
        }

        onConfirm();
    };

    return (
        <Modal
            icon={icon}
            buttonText="Enviar"
            buttonTextColor={mainTheme.colors.purple}
            buttonBackground="transparent"
            width={width}
            onConfirm={finishQuestions}
            style={{
                marginBottom: 10 * vh,
                marginTop: 10 * vh,
                paddingBottom: 3 * vh,
            }}
        >
            <Container showsVerticalScrollIndicator={false}>
                <Title>O paciente:</Title>
                <TitleDivision />
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
                        <Selection>
                            <SelectionColumn>
                                <SelectionItem horizontal>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[1]]: painOptions[0] }))}
                                        selected={answers[questions[1]] === painOptions[0]}
                                    />
                                    <SelectionText>{painOptions[0]}</SelectionText>
                                </SelectionItem>
                                <SelectionItem horizontal>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[1]]: painOptions[1] }))}
                                        selected={answers[questions[1]] === painOptions[1]}
                                    />
                                    <SelectionText>{painOptions[1]}</SelectionText>
                                </SelectionItem>
                                <SelectionItem horizontal>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[1]]: painOptions[2] }))}
                                        selected={answers[questions[1]] === painOptions[2]}
                                    />
                                    <SelectionText>{painOptions[2]}</SelectionText>
                                </SelectionItem>
                            </SelectionColumn>
                            <SelectionColumn>
                                <SelectionItem horizontal>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[1]]: painOptions[3] }))}
                                        selected={answers[questions[1]] === painOptions[3]}
                                    />
                                    <SelectionText>{painOptions[3]}</SelectionText>
                                </SelectionItem>
                                <SelectionItem horizontal>
                                    <SelectionCircle
                                        onPress={() => setAnswers(old => ({ ...old, [questions[1]]: painOptions[4] }))}
                                        selected={answers[questions[1]] === painOptions[4]}
                                    />
                                    <SelectionText>{painOptions[4]}</SelectionText>
                                </SelectionItem>
                                <SelectionItem horizontal>
                                    <SelectionCircle
                                        onPress={() => symptomInputRef.current?.focus()}
                                        selected={
                                            !!answers[questions[1]] && !painOptions.includes(answers[questions[1]])
                                        }
                                    />
                                    <SelectionInput
                                        ref={symptomInputRef}
                                        placeholder="Outro..."
                                        value={question2Input}
                                        onChange={e => {
                                            e.persist();
                                            setQuestion2Input(e.nativeEvent.text);
                                            setAnswers(old => ({ ...old, [questions[1]]: e.nativeEvent.text }));
                                        }}
                                    />
                                </SelectionItem>
                            </SelectionColumn>
                        </Selection>
                    </Symptom>
                )}
                <Symptom>
                    <SymptomQuestion>{questions[2]}</SymptomQuestion>
                    <Selection style={{ flexDirection: 'column' }}>
                        <SelectionItem horizontal style={{ justifyContent: 'center' }}>
                            <SelectionCircle
                                onPress={() => setAnswers(old => ({ ...old, [questions[2]]: eatingOptions[0] }))}
                                selected={answers[questions[2]] === eatingOptions[0]}
                            />
                            <SelectionText>{eatingOptions[0]}</SelectionText>
                        </SelectionItem>
                        <View style={{ alignItems: 'center' }}>
                            <SelectionRow>
                                {eatingOptions.slice(1, 2 + 1).map((eatingOption, index) => (
                                    <SelectionItem key={index} horizontal style={{ width: '40%' }}>
                                        <SelectionCircle
                                            onPress={() =>
                                                setAnswers(old => ({ ...old, [questions[2]]: eatingOption }))
                                            }
                                            selected={answers[questions[2]] === eatingOption}
                                        />
                                        <SelectionText>{eatingOption}</SelectionText>
                                    </SelectionItem>
                                ))}
                            </SelectionRow>
                            <SelectionRow>
                                {eatingOptions.slice(3, 4 + 1).map((eatingOption, index) => (
                                    <SelectionItem key={index} horizontal style={{ width: '40%' }}>
                                        <SelectionCircle
                                            onPress={() =>
                                                setAnswers(old => ({ ...old, [questions[2]]: eatingOption }))
                                            }
                                            selected={answers[questions[2]] === eatingOption}
                                        />
                                        <SelectionText>{eatingOption}</SelectionText>
                                    </SelectionItem>
                                ))}
                            </SelectionRow>
                        </View>
                    </Selection>
                </Symptom>
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
            </Container>
        </Modal>
    );
};

export default SymptomQuestions;
