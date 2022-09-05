import { useStorage } from '@contexts/storage';
import { useNavigation } from '@react-navigation/native';
import { RouteParams } from 'data/@types/navigation';

import Button from '@components/Button';

import { ConfirmationPrompt, ConfirmationText, Container, Photo } from '@styles/CheckupConfirm';

export interface CheckupConfirmParams {
  filePath: string | undefined;
}

const CheckupConfirm: React.FC<RouteParams<CheckupConfirmParams>> = ({ route }) => {
  const { navigate } = useNavigation();
  const { checkupProgress, storeValue } = useStorage();

  const handleYes = async (): Promise<void> => {
    await storeValue('checkupProgress', checkupProgress + 1);
    navigate('CheckupInstructions');
  };

  return (
    <Container>
      <ConfirmationText>A foto está boa?</ConfirmationText>
      <Photo source={{ uri: `file://${route.params?.filePath}` }} />
      <ConfirmationPrompt>
        <Button padding={[16, 32]} onPress={() => navigate('CheckupInstructions')} style={{ marginRight: 24 }}>
          Não
        </Button>
        <Button padding={[16, 32]} onPress={handleYes} style={{ marginLeft: 24 }}>
          Sim
        </Button>
      </ConfirmationPrompt>
    </Container>
  );
};

export default CheckupConfirm;
