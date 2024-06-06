import * as FileSystem from 'expo-file-system';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, StatusBar, View } from 'react-native';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import { useInfo } from '@context/info';
import { useStorage } from '@context/storage';
import { vh, vw } from '@utils';

import mainTheme from '@theme';

import checkup from 'assets/checkup.json';
import MinLogoText from 'assets/minLogoText.svg';
import MinLogoWhite from 'assets/minLogoWhite.svg';
import MinLogoWhiteAlt from 'assets/minLogoWhiteAlt.svg';

import { Header } from '../instructions/styles';
import { ConfirmationPrompt, ConfirmationText, Container, Photo } from './styles';

export default function CheckupConfirm() {
    const { currentCheckupStep } = useInfo();
    const { filePath } = useLocalSearchParams<{
        filePath: string;
    }>();
    const { checkupProgress, storeValue } = useStorage();

    const uri = filePath!.replace('@', '%2540').replace('/', '%252F');
    console.log(uri);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            router.push('/checkup/instructions');
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const handleYes = async (): Promise<void> => {
        if (filePath) {
            const destination = `${FileSystem.documentDirectory}checkup_photos`;

            const destinationInfo = await FileSystem.getInfoAsync(destination);
            if (!destinationInfo.exists) {
                FileSystem.makeDirectoryAsync(destination);
            }

            // @ts-ignore
            const fullDestination = `${destination}/${(filePath.match(/Camera\/(.*\.jpg)/) as string[])[1]}`;

            await FileSystem.moveAsync({
                from: uri,
                to: fullDestination,
            });

            await storeValue('checkupProgress', {
                ...checkupProgress,
                [checkup.titles[currentCheckupStep]]: fullDestination,
            });
        }

        router.push('/checkup');
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
                <Photo source={{ uri }} />
                <ConfirmationPrompt>
                    <View>
                        <MinLogoWhiteAlt height={3 * vh} style={{ marginBottom: 2 * vh }} />
                        <Button
                            background={mainTheme.colors.gold}
                            bold
                            padding={[1 * vh, 10 * vw]}
                            onPress={() => router.push('/checkup/instructions')}
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
}
