import { random } from 'data/utils';
import { useEffect, useState } from 'react';

import BottomBar from '@components/BottomBar';

import {
 Container,
 DailyMissionText,
 Mission,
 MissionTitle,
 ProgressBar,
 ProgressBarColor,
 ProgressBarText,
 ProgressSign,
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

 const handlePlusMinus = (action: string, id: string): void => {
  setProgress(old => ({
   ...old,
   [id]: old[id] + (action === 'plus' ? 1 : -1),
  }));
 };

 return (
  <>
   <Container showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 0 }}>
    {objectives.map(objective => (
     <Mission key={objective.id}>
      <MissionTitle>{objective.text}</MissionTitle>
      {objective.isDaily && <DailyMissionText>Missão diária</DailyMissionText>}
      <ProgressBar>
       <ProgressBarColor progress={progress[objective.id] / objective.quantity} />
       {progress[objective.id] > 0 && (
        <ProgressSign sign="minus" onPress={() => handlePlusMinus('minus', objective.id)} />
       )}
       <ProgressBarText>
        {progress[objective.id]} / {objective.quantity}
       </ProgressBarText>
       {progress[objective.id] < objective.quantity && (
        <ProgressSign sign="plus" onPress={() => handlePlusMinus('plus', objective.id)} />
       )}
      </ProgressBar>
     </Mission>
    ))}
   </Container>

   <BottomBar />
  </>
 );
};

export default Diary;
