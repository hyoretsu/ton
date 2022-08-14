import { useNavigation } from '@react-navigation/native';

import BackButton from '@components/BackButton';
import Button from '@components/Button';

import { Container, Instructions, TextBody, Title } from '@styles/Checkup';

const CheckupWelcome: React.FC = () => {
 const { navigate } = useNavigation();

 return (
  <>
   <BackButton size={30} />

   <Container>
    <Title>Exame oral</Title>

    <TextBody>
     <Instructions>
      Agora, você irá tirar várias fotos da boca do(a) paciente para que possamos checar a saúde de seus dentes.
     </Instructions>
     <Instructions>
      Na próxima tela, haverá instruções para tirar a foto e um exemplo de como ela deve ser tirada.
     </Instructions>
     <Instructions style={{ paddingHorizontal: 28 }}>
      Após tirar a foto, ambas serão mostradas lado a lado para checar se está boa.
     </Instructions>
     <Instructions>Vamos lá?</Instructions>
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
