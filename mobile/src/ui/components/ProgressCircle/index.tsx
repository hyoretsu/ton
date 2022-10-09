import { StyleProp } from 'react-native';

import { Circle, CircleFill, CircleHalf, Progress } from './styles';

interface ProgressCircleProps {
  background: string;
  color: string;
  progress: number;
  radius: number;
  style: StyleProp<any>;
  text: number | string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ background, color, progress, radius, style, text }) => {
  return (
    <Circle color={color} radius={radius} style={style}>
      <CircleFill radius={radius}>
        <CircleHalf
          half="first"
          degree={-Math.min(progress * 360 - 180, 0)}
          color={color}
          background={background}
          radius={radius}
        />
        <CircleHalf
          half="second"
          degree={-Math.max(progress * 360, 180)}
          color={color}
          background={background}
          radius={radius}
        />
      </CircleFill>
      <Progress background={background} radius={radius}>
        {text}
      </Progress>
    </Circle>
  );
};

export default ProgressCircle;
