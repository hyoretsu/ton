import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Objective, Progress } from 'backend';
import { useEffect, useState } from 'react';

import BottomBar from '@components/BottomBar';

import api from '@api';

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

const Diary: React.FC = () => {
  const { navigate } = useNavigation();

  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const handlePlusMinus = async (action: string, objectiveId: number): Promise<void> => {
    const updatedProgress = (progress[objectiveId] || 0) + (action === 'plus' ? 1 : -1);

    await api.post('/objectives/progress', {
      objectiveId,
      progress: updatedProgress,
    });

    setProgress(old => ({ ...old, [objectiveId]: updatedProgress }));
  };

  useEffect(() => {
    AsyncStorage.getItem('@eOdontologia:objectives').then(storedObjectives => {
      if (storedObjectives) {
        setObjectives(JSON.parse(storedObjectives));
      }

      api.get('/objectives').then(({ data }) => {
        setObjectives(data);
        AsyncStorage.setItem('@eOdontologia:objectives', JSON.stringify(data));
      });
    });

    AsyncStorage.getItem('@eOdontologia:progress').then(storedProgress => {
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }

      api.get('/objectives/progress').then(({ data }: { data: Progress[] }) => {
        const parsedProgress = data.reduce((obj, entry) => {
          return {
            ...obj,
            [entry.objectiveId]: entry.progress,
          };
        }, {});

        setProgress(old => ({
          ...old,
          ...parsedProgress,
        }));
        AsyncStorage.setItem('@eOdontologia:progress', JSON.stringify(parsedProgress));
      });
    });
  }, []);

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
            <MissionTitle>{objective.title}</MissionTitle>
            {objective.isDaily && <DailyMissionText>Missão diária</DailyMissionText>}
            <ProgressBar>
              <ProgressBarColor progress={progress[objective.id] / objective.goal} />
              {progress[objective.id] > 0 && (
                <ProgressSign sign="minus" onPress={() => handlePlusMinus('minus', objective.id)} />
              )}
              <ProgressBarText>
                {progress[objective.id] || 0} / {objective.goal}
              </ProgressBarText>
              {(progress[objective.id] || 0) < objective.goal && (
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
