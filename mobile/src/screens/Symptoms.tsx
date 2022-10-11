import { useStorage } from '@contexts/storage';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import Button from '@components/Button';
import OpacityFilter from '@components/OpacityFilter';

import api from '@api';

import {
  Container,
  Info,
  Selection,
  SelectionCircle,
  SelectionColumn,
  SelectionInput,
  SelectionItem,
  SelectionRow,
  SelectionText,
  Symptom,
  SymptomQuestion,
  ThanksModal,
  ThanksText,
  Title,
} from '@styles/Symptoms';

const Symptoms: React.FC = () => {
  const { navigate } = useNavigation();
  const { checkupProgress, storeValue } = useStorage();

  const symptomInputRef = useRef<TextInput>(null);
  const [modalVisible, setModalVisibility] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [question2Input, setQuestion2Input] = useState('');

  const questions = [
    'O paciente sente ou sentiu dor na boca esta semana?',
    'Se sim, onde foi a dor?',
    'O paciente está se alimentando normal?',
    'O paciente reclamou de sentir a boca mais seca? Com menos saliva que o normal?',
    'O paciente percebe que seus lábios estão ressecados?',
  ];

  const painOptions = ['Garganta', 'Dente', 'Língua', 'Gengiva', 'Lábio'];

  const eatingOptions = [
    'Sim',
    'Não, está com fastio.',
    'Não, só líquidos, como sucos, Sustagen e vitaminas.',
    'Não, só comida pastosa.',
    'Não, nem líquidos consegue tomar.',
  ];

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

    setModalVisibility(true);
  };

  return (
    <>
      <Container>
        <Title>Sintomatologia</Title>
        <Info>
          Obrigada pelas fotos 😊{'\n\n'}
          Para finalizar o exame desta semana, pedimos que responda as próximas questões sobre como a
          criança/adolescente está se sentindo:
        </Info>
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
                    selected={!!answers[questions[1]] && !painOptions.includes(answers[questions[1]])}
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
                <SelectionItem horizontal style={{ width: '40%' }}>
                  <SelectionCircle
                    onPress={() => setAnswers(old => ({ ...old, [questions[2]]: eatingOptions[1] }))}
                    selected={answers[questions[2]] === eatingOptions[1]}
                  />
                  <SelectionText>{eatingOptions[1]}</SelectionText>
                </SelectionItem>
                <SelectionItem horizontal style={{ width: '40%' }}>
                  <SelectionCircle
                    onPress={() =>
                      setAnswers(old => ({
                        ...old,
                        [questions[2]]: eatingOptions[2],
                      }))
                    }
                    selected={answers[questions[2]] === eatingOptions[2]}
                  />
                  <SelectionText>{eatingOptions[2]}</SelectionText>
                </SelectionItem>
              </SelectionRow>
              <SelectionRow>
                <SelectionItem horizontal style={{ width: '40%' }}>
                  <SelectionCircle
                    onPress={() => setAnswers(old => ({ ...old, [questions[2]]: eatingOptions[3] }))}
                    selected={answers[questions[2]] === eatingOptions[3]}
                  />
                  <SelectionText>{eatingOptions[3]}</SelectionText>
                </SelectionItem>
                <SelectionItem horizontal style={{ width: '40%' }}>
                  <SelectionCircle
                    onPress={() => setAnswers(old => ({ ...old, [questions[2]]: eatingOptions[4] }))}
                    selected={answers[questions[2]] === eatingOptions[4]}
                  />
                  <SelectionText>{eatingOptions[4]}</SelectionText>
                </SelectionItem>
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
        <Button onPress={finishCheckup} style={{ marginTop: 12, marginBottom: 32 }}>
          Enviar
        </Button>
      </Container>

      {modalVisible && (
        <OpacityFilter>
          <ThanksModal>
            <ThanksText>Fim do exame desta semana! 😄</ThanksText>
            <ThanksText>Obrigada por sua ajuda, vamos avaliar as fotos e damos notícias pelo chat.</ThanksText>
            <ThanksText>Qualquer coisa, fique à vontade para entrar em contato conosco por lá também.</ThanksText>

            <Button onPress={() => navigate('Diary')}>Voltar</Button>
          </ThanksModal>
        </OpacityFilter>
      )}
    </>
  );
};

export default Symptoms;
