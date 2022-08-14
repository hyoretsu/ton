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

import objectives from 'assets/objectives.json';

type Progress = Record<string, number>;

const Diary: React.FC = () => {
 const [progress, setProgress] = useState<Progress>({});

 useEffect(() => {
  objectives.forEach(objective => {
   setProgress(old => ({
    ...old,
    [objective.id]: 0,
   }));
  });
 }, []);

 const handlePlusMinus = (action: string, id: number): void => {
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
