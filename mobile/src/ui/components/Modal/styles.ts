import styled from 'rn-css';

export const Container = styled.View`
    align-items: center;

    width: 70%;
    background-color: ${({ theme }) => theme.colors.background};

    border-radius: 15vw;
    padding: 3vh 5vw 4vh;
`;
