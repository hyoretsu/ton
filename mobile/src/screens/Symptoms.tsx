import { range } from 'data/utils';
import { useState } from 'react';

import Button from '@components/Button';

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
  const [symptomAnswers, setAnswers] = useState<Record<string, number>>({});

  const symptomQuestions = [
    'Consegue ingerir alimentos sólidos?',
    'Consegue ingerir líquidos?',
    'Sente dor ao engolir?',
    'Sente dor ao mastigar?',
    'A boca está hidratada?',
  ];

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
      <Button style={{ marginTop: 12 }}>Enviar</Button>
    </Container>
  );
};

export default Symptoms;
