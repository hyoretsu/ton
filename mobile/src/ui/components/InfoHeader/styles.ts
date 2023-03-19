import styled from 'rn-css';

export const Container = styled.View``;

export const Border = styled.View`
    align-self: center;

    background-color: ${({ theme }) => theme.colors.purple};
    width: 90%;
    height: 1.5px;

    margin-top: 2vh;
`;

export const Title = styled.Text`
    align-self: center;

    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1.5em;

    margin-left: 10vw;
`;
