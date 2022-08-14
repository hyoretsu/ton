import styled from 'styled-components/native';

interface CircleProps {
 size: number;
}

export const InnerCircle = styled.View<CircleProps>`
 width: ${({ size }) => size / 3}px;
 height: ${({ size }) => size / 3}px;

 border: 2px #fff8;
 border-radius: ${({ size }) => size / 6}px;
 margin: auto;
`;

export const OuterCircle = styled.View<CircleProps>`
 width: ${({ size }) => size}px;
 height: ${({ size }) => size}px;

 border: 2px #fff;
 border-radius: ${({ size }) => size / 2}px;
`;
