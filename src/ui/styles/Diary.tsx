import { ViewProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

interface MissionProgressProps extends ViewProps {
 progress: number;
}
interface ProgressSignProps extends RectButtonProps {
 sign: string;
}

export const Container = styled.View`
 flex: 1;
`;

export const DailyMissionText = styled.Text`
 font-size: 15px;
 color: #fffa;
`;

export const Mission = styled.View`
 flex-direction: column;

 background-color: #a3bee9;

 border: 2px #0006;
 border-radius: 20px;
 padding: 8px 16px 12px;
 margin-bottom: 20px;
`;

export const MissionTitle = styled.Text`
 font-size: 20px;
`;

export const ProgressBar = styled.View`
 position: relative;
 align-items: center;
 justify-content: center;

 width: 100%;
 height: 28px;
 background-color: #0004;

 border-radius: 20px;
 margin-top: 40px;
`;

export const ProgressBarColor = styled.View<MissionProgressProps>`
 position: absolute;
 left: 0;

 width: ${({ progress }) => progress * 100}%;
 height: 100%;
 background-color: #0f0;

 border-radius: 20px;
`;

export const ProgressBarText = styled.Text`
 font-size: 16px;
`;

export const ProgressSign = styled(RectButton).attrs((props: ProgressSignProps) => ({
 children: <Icon name={props.sign} size={20} />,
}))<ProgressSignProps>`
 position: absolute;

 ${({ sign }) =>
  sign === 'plus'
   ? {
      right: 0,
      paddingRight: 4,
      paddingVertical: 2,
     }
   : {
      left: 0,
      paddingLeft: 4,
      paddingVertical: 2,
     }}

 border: 2px #0006;
 border-radius: 20px;
`;
