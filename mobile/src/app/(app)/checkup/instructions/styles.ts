import styled from 'rn-css';

export const Container = styled.View`
    align-items: center;
    flex: 1;

    background-color: ${({ theme }) => theme.colors.purple};

    padding: 3vh 5vw 1vh;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`;

export const Instructions = styled.View`
    align-items: center;
`;

export const InstructionsText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 0.8em;
    color: #fff;
`;

export const StepTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.3em;
    color: #fff;
    text-align: center;

    margin-top: 2vh;
`;

export const Example = styled.Image`
    width: calc(52vh / 16 * 9);
    height: 52vh;

    margin-top: 4vh;
    border-radius: 10vw;
`;
