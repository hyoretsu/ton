import styled from 'styled-components';

export const Styling = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2vw;

    padding: 2vh 0;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 30vw;

    padding: 0.5vh 1.5vw;

    border: 1px solid #000;
    border-radius: 1vw;

    p {
        color: #777;

        margin-bottom: 1vh;
    }

    button:hover {
        opacity: 0.7;
    }
`;

export const InfoText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin: 1vh 0;
`;

export const InfoButtons = styled.div`
    display: flex;
    justify-content: space-around;

    button {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
