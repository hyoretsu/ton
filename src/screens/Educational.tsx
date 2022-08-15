import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import BottomBar from '@components/BottomBar';

import { Container, ContentBox, ContentButton, ContentDate, ContentTitle, ContentDateIcon } from '@styles/Educational';

interface Content {
  id: string;
  title: string;
}

const Educational: React.FC = () => {
  const { navigate } = useNavigation();

  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    setContents(
      Array.from({ length: 10 }, (_, index) => ({
        id: String(index),
        title: 'Por que o acompanhamento odontológico é importante para o tratamento do cancer?',
      })),
    );
  }, []);

  return (
    <>
      <Container showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 0 }}>
        {contents.map(content => (
          <ContentBox key={content.id}>
            <ContentButton onPress={() => navigate('Chat', { content: content.title })}>
              <ContentTitle>{content.title}</ContentTitle>
              <ContentDateIcon>
                <ContentDate>16/07/2022</ContentDate>
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
