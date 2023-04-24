import styled from 'styled-components';

export const Styling = styled.div``;

export const Patients = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2vw;

    padding: 2vh 0;
`;

export const Patient = styled.div`
    display: flex;
    flex-direction: column;

    width: 30vw;

    padding: 0.5vh 1.5vw;

    border: 1px solid #000;
    border-radius: 1vw;

    button:hover {
        opacity: 0.7;
    }
`;

export const PatientInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin: 1vh 0;
`;

export const PatientButtons = styled.div`
    display: flex;
    justify-content: space-around;

    button {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const PatientTextGray = styled.span`
    color: #777;

    margin-bottom: 1vh;
`;
