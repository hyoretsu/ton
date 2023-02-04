import { useNavigation } from '@react-navigation/native';
import { DentalPhoto } from 'backend';
import { RouteParams } from 'data/@types/navigation';
import { useEffect, useState } from 'react';

import Button from '@components/Button';

import api from '@api';

import { Container, Example, Instructions, Body, Title } from '@styles/Checkup';

import { instructions, titles } from 'assets/checkup.json';

export interface CheckupInstructionsParams {
    step: string;
}

const CheckupInstructions: React.FC<RouteParams<CheckupInstructionsParams>> = ({ route }) => {
    // @ts-ignore
    const { step } = route.params;

    const { navigate } = useNavigation();

    const [example, setExample] = useState<DentalPhoto>({} as DentalPhoto);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.post('/checkup/photos/find', { category: step });
            console.log(data);

            setExample(data);
        };

        execute();
    }, [step]);

    return (
        <Container>
            <Title>{step}</Title>
            <Instructions>{instructions[titles.indexOf(step)]}</Instructions>
            <Body>
                {example && <Example source={{ uri: `http://192.168.0.5:3333/files/${example.fileName}` }} />}

                <Button onPress={() => navigate('CheckupCamera')} style={{ marginTop: 16, marginBottom: 12 }}>
                    Tirar foto
                </Button>
            </Body>
        </Container>
    );
};

export default CheckupInstructions;
