import { random } from 'data/utils';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import BottomBar from '@components/BottomBar';

import {
 Container,
 Mission,
 MissionProgress,
 MissionProgressColor,
 MissionProgressText,
 MissionText,
} from '@styles/Diary';

interface Objective {
 id: string;
 text: string;
 quantity: number;
}

type Progress = Record<string, number>;

const Diary: React.FC = () => {
 const [objectives, setObjectives] = useState<Objective[]>([]);
 const [progress, setProgress] = useState<Progress>({});

 useEffect(() => {
  const choices = ['Escovar os dentes', 'Passar fio denta dasda s da dasdasasdasdl'];

  setObjectives(
   Array.from({ length: 10 }, (_, index) => ({
    id: String(index),
    text: choices[random(1)],
    quantity: 3,
   })),
  );

  for (let i = 0; i < 10; i++) {
   setProgress(old => ({
    ...old,
    [i]: Math.round(Math.random() * 3),
   }));
  }
 }, []);

 return (
  <>
   <Container>
    <FlatList
     data={objectives}
     keyExtractor={objective => objective.id}
     showsVerticalScrollIndicator={false}
     renderItem={({ item: objective }) => (
      <Mission>
       <MissionText>{objective.text}</MissionText>
       <MissionProgress>
        <MissionProgressColor progress={progress[objective.id] / objective.quantity} />
        <MissionProgressText>
         {progress[objective.id]} / {objective.quantity}
        </MissionProgressText>
       </MissionProgress>
      </Mission>
     )}
     contentContainerStyle={{ padding: 20, paddingBottom: 0 }}
    />
   </Container>

   <BottomBar />
  </>
 );
};

export default Diary;
