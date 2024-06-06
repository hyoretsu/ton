import styled from 'rn-css';

export const Container = styled.View`
    align-items: center;
    z-index: 5;

    background-color: ${({ theme }) => theme.colors.background};

    border-radius: 15vw;
    padding: 3vh 5vw 5vh;
`;

export const ModalInfo = styled.View`
    flex-direction: row;
    align-items: center;

    margin-top: -2vh;
`;

export const ModalTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 5em;
    text-transform: lowercase;
    color: ${({ theme }) => theme.colors.purple};
    margin: 0 0 -3vh 2vw;
`;

export const ModalText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 1em;
    color: ${({ theme }) => theme.colors.purple};
    text-align: center;

    margin: 3vh 0;
`;
