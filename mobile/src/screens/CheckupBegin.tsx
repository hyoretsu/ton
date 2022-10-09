import { useStorage } from '@contexts/storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import BackButton from '@components/BackButton';
import Button from '@components/Button';

import { Container, Instructions, TextBody, Title } from '@styles/Checkup';

const CheckupWelcome: React.FC = () => {
  const { navigate } = useNavigation();
  const { storeValue } = useStorage();

  useEffect(() => {
    storeValue('checkupProgress', 0);
  }, [storeValue]);

  return (
    <>
      <BackButton size={30} />

      <Container>
        <Title>Exame oral</Title>

        <TextBody>
          <Instructions>Olá,</Instructions>
          <Instructions>Vamos agora checar a saúde da boca do seu filho?</Instructions>
          <Instructions>
            Para isto, vamos precisar que você tire algumas fotos da boca dele, seguindo as instruções que vão aparecer
            na tela e o exemplo que será mostrado.
          </Instructions>
          <Instructions>Após tirar cada foto, você poderá conferir se realmente ficou boa.</Instructions>
          <Instructions>Vamos lá?</Instructions>
          <Instructions>Antes de tirar as fotos, gire a tela do seu celular.</Instructions>
        </TextBody>

        <Button
          onPress={() => navigate('CheckupInstructions')}
          style={{ marginBottom: 64, paddingTop: 16, paddingBottom: 16 }}
        >
          Começar exame
        </Button>
      </Container>
    </>
  );
};

export default CheckupWelcome;
