import styled from 'rn-css';

export const Container = styled.View`
    flex: 1;

    background-color: #fff;

    padding: 6vh 12vw;
`;

export const InfosView = styled.View`
    align-items: center;

    margin-top: 4vh;
`;

export const InfoTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
`;

export const InfoText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};

    margin-bottom: 2vh;
`;
