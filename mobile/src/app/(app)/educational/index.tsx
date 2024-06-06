import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Content } from 'backend';
import { addWeeks, format } from 'date-fns';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';

import BottomBar from '@components/BottomBar';
import Header from '@components/Header';
import { useAuth } from '@context/auth';
import { vh, vw } from '@utils';

import api from '@api';

import mainTheme from '@theme';

import { Container, ContentButton, ContentDate, ContentTitle, NewNotification } from './styles';

export default function Educational() {
    const { user } = useAuth();

    const [contents, setContents] = useState<Content[]>([]);
    const [newContent, setNewContent] = useState(false);
    const [readContents, setReadContents] = useState<string[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const storedContent = await AsyncStorage.getItem('@ton:contents');
            let parsedContent: Content[] = [];

            if (storedContent) {
                parsedContent = JSON.parse(storedContent);
                setContents(parsedContent);
            }

            const storedReadContents = await AsyncStorage.getItem('@ton:read_contents');
            if (storedReadContents) {
                setReadContents(JSON.parse(storedReadContents));
            }

            const { data } = await api.get('/contents');
            if (parsedContent.length !== data.length) {
                setNewContent(true);
            }

            setContents(data);
            await AsyncStorage.setItem('@ton:contents', JSON.stringify(data));
        };

        execute();
    }, []);

    return (
        <>
            <StatusBar backgroundColor={mainTheme.colors.purple} />

            <Header>Educação</Header>

            <Container showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 0 }}>
                {contents.map((content, index) => {
                    const isNew = newContent && index === 0;
                    const isRead = readContents.includes(content.id);

                    return (
                        <>
                            <ContentButton
                                key={content.id}
                                onPress={async () => {
                                    setReadContents(old => {
                                        if (old.includes(content.id)) {
                                            return old;
                                        }

                                        const newReadContents = [...old, content.id];

                                        AsyncStorage.setItem('@ton:read_contents', JSON.stringify(newReadContents));

                                        return newReadContents;
                                    });

                                    router.push(`/chat?content=${content.title}`);
                                }}
                                style={[
                                    isNew && { backgroundColor: mainTheme.colors.gold },
                                    isRead && {
                                        backgroundColor: 'transparent',
                                        borderColor: mainTheme.colors.purple,
                                        borderWidth: 1,
                                    },
                                ]}
                            >
                                <View style={{ width: '80%' }}>
                                    <ContentTitle style={isRead && { color: mainTheme.colors.purple }}>
                                        {content.title}
                                    </ContentTitle>
                                    <ContentDate style={isRead && { color: mainTheme.colors.purple }}>
                                        {format(addWeeks(new Date(user.createdAt), content.condition), 'dd/MM/yyyy')}
                                    </ContentDate>
                                </View>

                                <Icon
                                    name="arrow-right-circle"
                                    size={3.5 * vh}
                                    color={isRead ? mainTheme.colors.purple : '#fff'}
                                    style={{ marginRight: 3 * vw }}
                                />
                            </ContentButton>

                            {isNew && <NewNotification>Novo!</NewNotification>}
                        </>
                    );
                })}
            </Container>

            <BottomBar />
        </>
    );
}
