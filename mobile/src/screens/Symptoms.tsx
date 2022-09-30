import { useStorage } from '@contexts/storage';
import { useNavigation } from '@react-navigation/native';
import { range } from 'data/utils';
import { useState } from 'react';
import { Platform } from 'react-native';

import Button from '@components/Button';

import api from '@api';

import {
  Container,
  Info,
  Selection,
  SelectionCircle,
  SelectionItem,
  SelectionNumber,
  SelectionText,
  Symptom,
  SymptomQuestion,
  Title,
} from '@styles/Symptoms';

const Symptoms: React.FC = () => {
  const { navigate } = useNavigation();
  const { checkupProgress, storeValue } = useStorage();

  const [symptomAnswers, setAnswers] = useState<Record<string, number>>({});

  const symptomQuestions = [
    'Consegue ingerir alimentos sólidos?',
    'Consegue ingerir líquidos?',
    'Sente dor ao engolir?',
    'Sente dor ao mastigar?',
    'A boca está hidratada?',
  ];

  const finishCheckup = async (): Promise<void> => {
    if (Object.values(symptomAnswers).length < 5) {
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
    formData.append('answers', JSON.stringify(symptomAnswers));

    await api.post('/checkup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await storeValue('checkupProgress', []);

    navigate('Diary');
  };

  return (
    <Container>
      <Title>Sintomatologia</Title>
      <Info>Agora, algumas perguntas para sabermos se está tudo bem.{'\n'}O paciente:</Info>
      {symptomQuestions.map((symptom, index) => (
        <Symptom key={index}>
          <SymptomQuestion>{symptom}</SymptomQuestion>
          <Selection>
            <SelectionText>Pouco</SelectionText>
            {range(1, 6).map(position => (
              <SelectionItem key={position}>
                <SelectionCircle
                  onPress={() => {
                    setAnswers(old => ({ ...old, [symptom]: position }));
                  }}
                  selected={symptomAnswers[symptom] === position}
                />
                <SelectionNumber>{position}</SelectionNumber>
              </SelectionItem>
            ))}
            <SelectionText>Muito</SelectionText>
          </Selection>
        </Symptom>
      ))}
      <Button onPress={finishCheckup} style={{ marginTop: 12 }}>
        Enviar
      </Button>
    </Container>
  );
};

export default Symptoms;
