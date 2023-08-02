import styled from 'rn-css';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    height: 10vh;
    background-color: ${({ theme }) => theme.colors.purple};

    padding: 0 5vw 0 8vw;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.8em;
    color: #fff;

    margin-right: 2vw;
`;
