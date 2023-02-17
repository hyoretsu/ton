import styled from 'rn-css';

export const Container = styled.View`
    align-items: center;
    flex: 1;

    background-color: ${({ theme }) => theme.colors.purple};

    padding: 3vh 5vw 1vh;
`;

export const ConfirmationText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.2em;
    color: #fff;

    margin: 3vh 0;
`;

export const Photo = styled.Image`
    width: calc(63vh / 16 * 9);
    height: 63vh;

    border-radius: 10vw;
`;

export const ConfirmationPrompt = styled.View`
    flex-direction: row;
    justify-content: space-between;

    width: 63vw;

    margin-top: 4vh;
`;
