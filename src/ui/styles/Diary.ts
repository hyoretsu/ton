import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface MissionProgressProps extends ViewProps {
 progress: number;
}

export const Container = styled.View`
 flex: 1;
`;

export const Mission = styled.View`
 flex-direction: column;

 background-color: #a3bee9;

 border: 2px #0006;
 border-radius: 20px;
 padding: 12px 16px;
 margin-bottom: 20px;
`;

export const MissionText = styled.Text`
 font-size: 20px;
`;

export const MissionProgress = styled.View`
 position: relative;
 align-items: center;
 justify-content: center;

 width: 100%;
 height: 28px;
 background-color: #0215;

 border-radius: 20px;
 margin-top: 40px;
`;
export const MissionProgressColor = styled.View<MissionProgressProps>`
 position: absolute;
 left: 0;

 width: ${({ progress }) => progress * 100}%;
 height: 100%;
 background-color: #0f0;

 border-radius: 20px;
 /* ${({ progress }) =>
  progress !== 1 && {
   'border-top-right-radius': 0,
   'border-bottom-right-radius': 0,
  }} */
`;

export const MissionProgressText = styled.Text`
 font-size: 16px;
`;
