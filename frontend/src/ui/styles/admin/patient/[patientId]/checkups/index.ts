import styled from 'styled-components';

export const Styling = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CheckupDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 1vw;

    border: 3px solid #000;
    border-radius: 1vw;

    & + & {
        margin-top: 3vh;
    }

    p,
    span {
        text-align: center;
    }
`;

export const PhotosDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1vw;
`;

export const PhotoCategoryDiv = styled.div`
    display: flex;
    flex-direction: column;
`;
