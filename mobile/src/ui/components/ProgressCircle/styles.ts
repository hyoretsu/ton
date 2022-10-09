import styled from 'styled-components/native';

interface CircleProps {
  color: string;
  radius: number;
}

interface CircleHalfProps {
  background: string;
  color: string;
  degree: number;
  half: string;
  radius: number;
}

interface ProgressProps {
  background: string;
  radius: number;
}

export const Circle = styled.View<CircleProps>`
  align-items: center;
  justify-content: center;
  align-self: center;

  height: ${({ radius }) => radius * 2}px;
  width: ${({ radius }) => radius * 2}px;
`;

export const CircleFill = styled.View`
  flex-direction: row;
  position: absolute;
`;

export const CircleHalf = styled.View<CircleHalfProps>`
  height: ${({ radius }) => radius * 2}px;
  width: ${({ radius }) => radius}px;
  background-color: ${({ background, color, degree }) => (degree === -180 ? background : color)};
  transform: translateX(${({ half, radius }) => (half === 'first' ? -radius : radius) / 2}px)
    rotate(${({ degree }) => (degree === -180 ? 360 : degree)}deg)
    translateX(${({ half, radius }) => (half === 'first' ? radius : -radius) / 2}px);

  border-radius: ${({ radius }) => radius}px;
  ${({ half }) => (half === 'first' ? 'border-top-right-radius' : 'border-top-left-radius')}: 0;
  ${({ half }) => (half === 'first' ? 'border-bottom-right-radius' : 'border-bottom-left-radius')}: 0;
`;

export const Progress = styled.Text<ProgressProps>`
  background-color: ${({ background }) => background};

  width: ${({ radius }) => Math.round(radius * 1.8)}px;
  height: ${({ radius }) => Math.round(radius * 1.8)}px;
  text-align: center;
  line-height: ${({ radius }) => Math.round(radius * 1.8)}px;

  border-radius: ${({ radius }) => radius}px;
`;
