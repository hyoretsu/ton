import { random } from 'data/utils';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import BottomBar from '@components/BottomBar';

import {
 Container,
 DailyMissionText,
 Mission,
 MissionTitle,
 ProgressBar,
 ProgressBarColor,
 ProgressBarText,
} from '@styles/Diary';

interface Objective {
 id: string;
 text: string;
 quantity: number;
 isDaily: boolean;
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
    isDaily: [true, false][random(1)],
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
       <MissionTitle>{objective.text}</MissionTitle>
       {objective.isDaily && <DailyMissionText>Missão diária</DailyMissionText>}
       <ProgressBar>
        <ProgressBarColor progress={progress[objective.id] / objective.quantity} />
        <ProgressBarText>
         {progress[objective.id]} / {objective.quantity}
        </ProgressBarText>
       </ProgressBar>
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
