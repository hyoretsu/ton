import { useStorage } from '@contexts/storage';
import notifee from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

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

const Diary: React.FC = () => {
  const { navigate } = useNavigation();
  const { objectiveProgress, storeValue } = useStorage();

  const handlePlusMinus = (action: string, id: number): void => {
    storeValue('objectiveProgress', [id, objectiveProgress[id] + (action === 'plus' ? 1 : -1)]);
  };

  useEffect(() => {
    notifee.getInitialNotification().then(notification => {
      if (notification) {
        // @ts-ignore
        navigate('Chat', { content: notification.notification.body });
      }
    });
  }, [navigate]);

  return (
    <>
      <Container showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 0 }}>
        {objectives.map(objective => (
          <Mission key={objective.id}>
            <MissionTitle>{objective.text}</MissionTitle>
            {objective.isDaily && <DailyMissionText>Missão diária</DailyMissionText>}
            <ProgressBar>
              <ProgressBarColor progress={objectiveProgress[objective.id] / objective.quantity} />
              {objectiveProgress[objective.id] > 0 && (
                <ProgressSign sign="minus" onPress={() => handlePlusMinus('minus', objective.id)} />
              )}
              <ProgressBarText>
                {objectiveProgress[objective.id]} / {objective.quantity}
              </ProgressBarText>
              {objectiveProgress[objective.id] < objective.quantity && (
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
