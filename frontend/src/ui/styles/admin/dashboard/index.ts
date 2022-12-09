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

    height: 10vw;
    width: 30vw;

    padding: 0.5vh 1.5vw;

    border: 1px solid #000;
    border-radius: 1vw;
`;

export const PatientInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin: 1vh 0;
`;

export const PatientButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin-left: auto;
`;

export const PatientButton = styled.button`
    svg:hover {
        opacity: 0.7;
    }
`;

export const PatientTextGray = styled.span`
    color: #777;

    margin-top: -1vh;
`;
