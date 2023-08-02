import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import BottomBar from '@components/BottomBar';
import ObjectivesList from '@components/ObjectivesList';
import PatientPhoto from '@components/PatientPhoto';
import Row from '@components/Row';

import {
    Container,
    Header,
    HeaderTitle,
    HeaderCircle,
    HeaderPhotoView,
    HeaderPhotoDesc,
    InfoTitle,
    InfoCircle,
    InfoCircleText,
    InfoView,
} from '@styles/Diary';
import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';

import HealthProfileSvg from 'assets/healthProfile.svg';
import PersonalDataSvg from 'assets/personalData.svg';
import TreatmentSvg from 'assets/treatment.svg';

const Diary: React.FC = () => {
    const { navigate } = useNavigation();

    return (
        <>
            <StatusBar backgroundColor="#fff" />

            <Header>
                <HeaderCircle
                    style={{
                        backgroundColor: mainTheme.colors.purple,
                        left: -0.5 * 15 * vh,
                    }}
                />
                <HeaderCircle
                    style={{
                        backgroundColor: mainTheme.colors.gold,
                        left: -0.75 * 15 * vh,
                        top: 6 * vh,
                    }}
                />

                <HeaderTitle>Diário</HeaderTitle>

                <HeaderPhotoDesc>Meu perfil</HeaderPhotoDesc>
                <HeaderPhotoView>
                    <PatientPhoto size={5 * vh} onPress={() => navigate('Profile')} />
                </HeaderPhotoView>
            </Header>

            <ObjectivesList style={{ flex: 1, paddingBottom: 7 * vh, paddingHorizontal: 7 * vw, paddingTop: 6 * vh }} />

            <Container>
                <InfoTitle>Informações:</InfoTitle>

                <Row style={{ justifyContent: 'space-between', width: '100%' }}>
                    <InfoView>
                        <InfoCircle onPress={() => navigate('PersonalData')}>
                            <PersonalDataSvg height={4 * vh} />
                        </InfoCircle>
                        <InfoCircleText>Dados pessoais</InfoCircleText>
                    </InfoView>
                    <InfoView>
                        <InfoCircle onPress={() => navigate('HealthProfile')}>
                            <HealthProfileSvg width={9 * vw} />
                        </InfoCircle>
                        <InfoCircleText>Perfil de saúde</InfoCircleText>
                    </InfoView>
                    <InfoView>
                        <InfoCircle onPress={() => navigate('Treatment')}>
                            <TreatmentSvg height={4 * vh} />
                        </InfoCircle>
                        <InfoCircleText>Tratamento</InfoCircleText>
                    </InfoView>
                </Row>
            </Container>

            <BottomBar />
        </>
    );
};

export default Diary;
