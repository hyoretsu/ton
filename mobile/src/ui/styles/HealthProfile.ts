import styled from 'rn-css';

export const Container = styled.View`
    flex: 1;

    background-color: #fff;

    padding: 6vh 12vw;
`;

export const HealthProfileDescription = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};

    font-size: 1.1em;
    text-align: center;

    margin-top: 4vh;
`;

export const HealthProfileView = styled.View`
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background};

    border-radius: 12vw;

    padding: 2vh 7vw 4vh;
    margin-top: 3vh;
`;

export const HealthProfileTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1.1em;

    margin: 1vh 0;
`;

export const HealthProfileBlackText = styled.Text`
    font-weight: 900;
`;

export const HealthProfileYear = styled.Text`
    align-self: flex-end;

    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.gold};
    font-size: 0.6em;
`;

export const HealthProfileText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1em;
`;

export const ShareButtonText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: #fff;

    margin-right: 3vw;
`;
