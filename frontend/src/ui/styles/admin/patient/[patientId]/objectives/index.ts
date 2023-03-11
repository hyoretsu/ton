import styled from 'styled-components';

export const Styling = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 12vw;
    width: 12vw;

    padding: 1vw;

    border: 1px solid #000;
    border-radius: 1vw;
`;

export const ObjectivesList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2vw;
`;
