import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
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
   <Container>
    <FlatList
     data={contents}
     keyExtractor={content => content.id}
     showsVerticalScrollIndicator={false}
     renderItem={({ item: content }) => (
      <ContentBox>
       <ContentButton onPress={() => navigate('Chat')}>
        <ContentTitle>{content.title}</ContentTitle>
        <ContentDateIcon>
         <ContentDate>16/07/2022</ContentDate>
         <Icon name="chevron-right" size={30} color="#0009" />
        </ContentDateIcon>
       </ContentButton>
      </ContentBox>
     )}
     contentContainerStyle={{ padding: 20, paddingBottom: 0 }}
    />
   </Container>

   <BottomBar />
  </>
 );
};

export default Educational;
