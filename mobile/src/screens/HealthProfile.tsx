import { Feather as Icon } from '@expo/vector-icons';
import { vh, vw } from '@units/viewport';
import { Hematology } from 'backend';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { Share, Text, View } from 'react-native';

import BottomBar from '@components/BottomBar';
import Button from '@components/Button';
import ProfileInfoHeader from '@components/ProfileInfoHeader';
import Row from '@components/Row';
import { useAuth } from '@context/auth';

import api from '@api';

import {
    Container,
    HealthProfileBlackText,
    HealthProfileDescription,
    HealthProfileText,
    HealthProfileTitle,
    HealthProfileView,
    HealthProfileYear,
    ShareButtonText,
} from '@styles/HealthProfile';

const HealthProfile: React.FC = () => {
    const { user } = useAuth();

    const [hematology, setHematology] = useState<Hematology>({ date: new Date() } as Hematology);

    const hematologyInfo = useMemo(
        () => [hematology.redCells, hematology.platelets, hematology.leukocytes, hematology.neutrophils],
        [hematology],
    );

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get('/users/hematology');

            setHematology(data[0]);
        };

        execute();
    });

    return (
        <>
            <Container>
                <ProfileInfoHeader>Perfil de saúde</ProfileInfoHeader>

                <HealthProfileDescription>Condição clínica atual</HealthProfileDescription>

                <HealthProfileView>
                    <HealthProfileTitle>Diagnóstico de base:</HealthProfileTitle>
                    <Text>{user.neoplasia}</Text>

                    <Row style={{ alignItems: 'center' }}>
                        <HealthProfileTitle>Condição hematológica em</HealthProfileTitle>

                        <View>
                            <HealthProfileBlackText
                                style={{
                                    marginLeft: 3 * vw,
                                    marginTop: 1 * vh,
                                }}
                            >
                                {format(new Date(hematology.date), 'dd/M')}
                            </HealthProfileBlackText>

                            <HealthProfileYear>({format(new Date(hematology.date), 'yyyy')})</HealthProfileYear>
                        </View>
                    </Row>
                    {hematologyInfo.map((info, index) => {
                        let title = '';

                        switch (index) {
                            case 0:
                                title = 'Hemácias';
                                break;
                            case 1:
                                title = 'Plaquetas';
                                break;
                            case 2:
                                title = 'Leucócitos';
                                break;
                            case 3:
                                title = 'Neutrófilos';
                                break;
                        }

                        return (
                            <Row key={index} style={{ marginTop: 2 * vh, width: '100%' }}>
                                <HealthProfileText>{title}</HealthProfileText>
                                <HealthProfileBlackText style={{ marginLeft: 'auto' }}>{info}</HealthProfileBlackText>
                            </Row>
                        );
                    })}
                </HealthProfileView>

                <Button
                    onPress={() =>
                        Share.share({
                            message: `Diagnóstico do câncer: ${user.neoplasia}\n\nCondição hematológica em: ${format(
                                new Date(hematology.date),
                                'dd/M/yyyy',
                            )}\nHemácias: ${hematology.redCells}\nPlaquetas: ${hematology.platelets}\nLeucócitos: ${
                                hematology.leukocytes
                            }\nNeutrófilos: ${hematology.neutrophils}`,
                        })
                    }
                    style={{ marginTop: 4 * vh }}
                >
                    <Row>
                        <ShareButtonText>Compartilhar dados do diagnóstico</ShareButtonText>
                        <Icon name="share-2" size={5 * vw} color="#fff" />
                    </Row>
                </Button>
            </Container>

            <BottomBar />
        </>
    );
};

export default HealthProfile;
