import styled from 'styled-components/native';

import Button from '@components/Button';

export const Container = styled.View`
    align-items: center;
    flex: 1;
`;

export const AppointmentButton = styled(Button).attrs({
    color: '#000',
    fontSize: 18,
    padding: [8, 8],
})``;

export const AppointmentTimes = styled.View`
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`;
