import { useNavigation } from '@react-navigation/native';
import { vh, vw } from '@units/viewport';
import { RouteParams } from 'data/@types/navigation';
import { useEffect } from 'react';
import { BackHandler, StatusBar, View } from 'react-native';
import mainTheme from 'ui/theme/main';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import { useInfo } from '@contexts/info';
import { useStorage } from '@contexts/storage';

import { ConfirmationPrompt, ConfirmationText, Container, Photo } from '@styles/CheckupConfirm';
import { Header } from '@styles/CheckupInstructions';

import checkup from 'assets/checkup.json';
import MinLogoText from 'assets/minLogoText.svg';
import MinLogoWhite from 'assets/minLogoWhite.svg';
import MinLogoWhiteAlt from 'assets/minLogoWhiteAlt.svg';

export interface CheckupConfirmParams {
    filePath: string | undefined;
}

const CheckupConfirm: React.FC<RouteParams<CheckupConfirmParams>> = ({ route }) => {
    const { currentCheckupStep } = useInfo();
    const { navigate } = useNavigation();
    const { checkupProgress, storeValue } = useStorage();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigate('CheckupInstructions');
            return true;
        });

        return () => backHandler.remove();
    }, [navigate]);

    const handleYes = async (): Promise<void> => {
        await storeValue('checkupProgress', {
            ...checkupProgress,
            [checkup.titles[currentCheckupStep]]: route.params?.filePath,
        });

        navigate('Checkup');
    };

    return (
        <>
            <StatusBar backgroundColor={mainTheme.colors.purple} hidden={false} />

            <Container>
                <Header>
                    <BackButton
                        size={4 * vh}
                        style={{
                            alignSelf: 'flex-start',
                        }}
                    />

                    <MinLogoText
                        height={6 * vh}
                        width={10 * vw}
                        style={{
                            marginTop: -2 * vh,
                        }}
                    />
                </Header>

                <ConfirmationText>A foto ficou boa?</ConfirmationText>
                <Photo source={{ uri: `file://${route.params?.filePath}` }} />
                <ConfirmationPrompt>
                    <View>
                        <MinLogoWhiteAlt height={3 * vh} style={{ marginBottom: 2 * vh }} />
                        <Button
                            background={mainTheme.colors.gold}
                            bold
                            padding={[1 * vh, 10 * vw]}
                            onPress={() => navigate('CheckupInstructions')}
                        >
                            Não
                        </Button>
                    </View>
                    <View>
                        <MinLogoWhite height={3 * vh} style={{ marginBottom: 2 * vh }} />
                        <Button background={mainTheme.colors.gold} bold padding={[1 * vh, 10 * vw]} onPress={handleYes}>
                            Sim
                        </Button>
                    </View>
                </ConfirmationPrompt>
            </Container>
        </>
    );
};

export default CheckupConfirm;
