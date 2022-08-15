import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

export interface FilterProps extends ViewProps {
  /** Value between 0 and 1. */
  opacity?: number;
}

export const Container = styled.View<FilterProps>`
  position: absolute;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, ${({ opacity }) => opacity || 0.5});
`;
