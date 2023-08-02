import { format } from 'date-fns';
import { View } from 'react-native';

import BottomBar from '@components/BottomBar';
import PatientPhoto from '@components/PatientPhoto';
import ProfileInfoHeader from '@components/ProfileInfoHeader';
import { useAuth } from '@context/auth';

import { Container, InfoText, InfoTitle, InfosView } from '@styles/PersonalData';
import { vw } from '@units/viewport';

import MinLogoPurple from 'assets/minLogoPurple.svg';

type Info = [string, string | Date | null];

const PersonalData: React.FC = () => {
    const { user } = useAuth();

    const infos: Info[] = [
        ['Nome do paciente', user.name],
        ['Nome do responsável', user.parentName],
        ['Data de nascimento', user.birthDate],
        ['Cidade de residência', user.city],
        ['Telefone para contato', user.phoneNumber],
    ];

    return (
        <>
            <Container>
                <ProfileInfoHeader>Dados pessoais</ProfileInfoHeader>

                <MinLogoPurple width={8 * vw} style={{ alignSelf: 'center' }} />

                <View style={{ alignSelf: 'center', height: 26 * vw, width: 26 * vw }}>
                    <PatientPhoto size={20 * vw} />
                </View>

                <InfosView>
                    {infos.map((info, index) => (
                        <>
                            <InfoTitle>{info[0]}</InfoTitle>
                            <InfoText>
                                {(() => {
                                    if (index === 2) {
                                        return format(new Date(info[1] as Date), 'dd/MM/yyyy');
                                    }

                                    if (index === 4) {
                                        const phone = info[1] as string;

                                        return `(${phone[0]}${phone[1]}) ${phone.substring(2, 7)}-${phone.substring(
                                            7,
                                            11,
                                        )}`;
                                    }

                                    return info[1] as string;
                                })()}
                            </InfoText>
                        </>
                    ))}
                </InfosView>
            </Container>

            <BottomBar />
        </>
    );
};

export default PersonalData;
