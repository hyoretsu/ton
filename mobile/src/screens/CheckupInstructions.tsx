import { useStorage } from '@contexts/storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import Button from '@components/Button';

import { Container, Example, Instructions, Body, Title } from '@styles/Checkup';

import checkup from 'assets/checkup.json';

const CheckupInstructions: React.FC = () => {
  const [example, setExample] = useState('');

  const { instructions, titles } = checkup;
  const { navigate } = useNavigation();
  const { checkupProgress } = useStorage();

  useEffect(() => {
    setExample('https://i.pinimg.com/originals/2e/c6/b5/2ec6b5e14fe0cba0cb0aa5d2caeeccc6.jpg');

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigate('Diary');
      return true;
    });

    return () => backHandler.remove();
  }, [navigate]);

  return (
    <Container>
      <Title>{titles[checkupProgress]}</Title>
      <Instructions>{instructions[checkupProgress]}</Instructions>
      <Body>
        {example && <Example source={{ uri: example }} />}

        <Button onPress={() => navigate('CheckupCamera')} style={{ marginTop: 16, marginBottom: 12 }}>
          Tirar foto
        </Button>
      </Body>
    </Container>
  );
};

export default CheckupInstructions;
