import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';
import { BackHandler, StatusBar, View } from 'react-native';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import { useInfo } from '@context/info';
import { useStorage } from '@context/storage';
import { RouteParams } from 'data/@types/navigation';

import { ConfirmationPrompt, ConfirmationText, Container, Photo } from '@styles/CheckupConfirm';
import { Header } from '@styles/CheckupInstructions';
import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';

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
        if (route.params && route.params.filePath) {
            const destination = `${FileSystem.documentDirectory}checkup_photos`;

            const destinationInfo = await FileSystem.getInfoAsync(destination);
            if (!destinationInfo.exists) {
                FileSystem.makeDirectoryAsync(destination);
            }

            // @ts-ignore
            const fullDestination = `${destination}/${
                (route.params.filePath.match(/Camera\/(.*\.jpg)/) as string[])[1]
            }`;

            await FileSystem.moveAsync({
                from: route.params.filePath,
                to: fullDestination,
            });

            await storeValue('checkupProgress', {
                ...checkupProgress,
                [checkup.titles[currentCheckupStep]]: fullDestination,
            });
        }

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
