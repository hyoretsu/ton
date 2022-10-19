import { useNavigation } from '@react-navigation/native';
import { DentalPhoto } from 'backend';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import Button from '@components/Button';
import { useStorage } from '@contexts/storage';

import api from '@api';

import { Container, Example, Instructions, Body, Title } from '@styles/Checkup';

import checkup from 'assets/checkup.json';

const CheckupInstructions: React.FC = () => {
    const [example, setExample] = useState<DentalPhoto>({});

    const { instructions, titles } = checkup;
    const { navigate } = useNavigation();
    const { checkupProgress } = useStorage();

    const checkupLength = Object.entries(checkupProgress).length;

    useEffect(() => {
        api.post('/checkup/photos/find', { category: titles[checkupLength] }).then(({ data }) => setExample(data));

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigate('Diary');
            return true;
        });

        return () => backHandler.remove();
    }, [checkupLength, navigate, titles]);

    return (
        <Container>
            <Title>{titles[checkupLength]}</Title>
            <Instructions>{instructions[checkupLength]}</Instructions>
            <Body>
                {example && <Example source={{ uri: `http://192.168.0.2:3333/files/${example.fileName}` }} />}

                <Button onPress={() => navigate('CheckupCamera')} style={{ marginTop: 16, marginBottom: 12 }}>
                    Tirar foto
                </Button>
            </Body>
        </Container>
    );
};

export default CheckupInstructions;
