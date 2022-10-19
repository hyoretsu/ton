import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Content } from 'backend';
import { addWeeks, format } from 'date-fns';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import BottomBar from '@components/BottomBar';
import { useAuth } from '@contexts/auth';

import api from '@api';

import { Container, ContentBox, ContentButton, ContentDate, ContentTitle, ContentDateIcon } from '@styles/Educational';

const Educational: React.FC = () => {
    const { user } = useAuth();
    const { navigate } = useNavigation();

    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const storedContent = await AsyncStorage.getItem('@eOdontologia:contents');
            if (storedContent) {
                setContents(JSON.parse(storedContent));
            }

            const { data } = await api.get('/contents');

            setContents(data);
            await AsyncStorage.setItem('@eOdontologia:contents', JSON.stringify(data));
        };

        execute();
    }, []);

    return (
        <>
            <Container showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 0 }}>
                {contents.map(content => (
                    <ContentBox key={content.id}>
                        <ContentButton onPress={() => navigate('Chat', { content: content.title })}>
                            <ContentTitle>{content.title}</ContentTitle>
                            <ContentDateIcon>
                                <ContentDate>
                                    {format(addWeeks(new Date(user.createdAt), content.condition), 'dd/MM/yyyy')}
                                </ContentDate>
                                <Icon name="chevron-right" size={30} color="#0009" />
                            </ContentDateIcon>
                        </ContentButton>
                    </ContentBox>
                ))}
            </Container>

            <BottomBar />
        </>
    );
};

export default Educational;
