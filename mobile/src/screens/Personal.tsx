import { useNavigation } from '@react-navigation/native';

import BottomBar from '@components/BottomBar';
import Button from '@components/Button';

import { Container, Title } from '@styles/Personal';

const Personal: React.FC = () => {
    const { navigate } = useNavigation();

    return (
        <>
            <Container>
                <Title>Paciente</Title>
                <Button onPress={() => navigate('EditProfile')}>Editar perfil</Button>
                <Button onPress={() => navigate('Appointments')} style={{ marginTop: 12 }}>
                    Marcar consulta
                </Button>
            </Container>

            <BottomBar />
        </>
    );
};

export default Personal;
