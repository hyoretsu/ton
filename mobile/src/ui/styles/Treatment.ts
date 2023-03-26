import styled from 'rn-css';

export const Container = styled.View`
    flex: 1;

    background-color: #fff;

    padding: 6vh 6vw;
`;

export const TreatmentTitle = styled.Text`
    align-self: center;

    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1.4em;

    margin: 2vh 0;
`;

export const TreatmentView = styled.View`
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background};

    border-radius: 12vw;

    padding: 2vh 7vw 4vh;
`;

export const MedicineDuration = styled.View`
    flex-direction: row;

    padding-bottom: 1.5vh;
    border-bottom: 2px solid ${({ theme }) => theme.colors.purple};
`;

export const MedicineDateDescBig = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1.2em;
`;

export const MedicineDateDesc = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 0.6em;
`;

export const MedicineDateView = styled.View`
    align-items: center;

    padding: 0.5vh 1vw;
    border-radius: 3vw;
`;

export const MedicineDateViewText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: #fff;
    font-size: 0.8em;
`;

export const MedicineTable = styled.View`
    width: 100%;

    margin-top: 2vh;
`;

export const MedicineTableHeader = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.medium};
    color: #fff;
    font-size: 1em;

    padding: 1vh 0;
    border-radius: 50vw;
`;

export const MedicineList = styled.View`
    flex-direction: row;

    padding: 0 3vw;
`;

export const MedicineName = styled.Text`
    text-align: center;

    font-family: ${({ theme }) => theme.fontFamily.medium};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1em;
    background-color: #fff;
    width: 57%;

    padding: 1vh 3vw;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.purple};
    border-right-width: 1px;
    border-right-color: ${({ theme }) => theme.colors.purple};
`;

export const MedicineDosage = styled.Text`
    flex: 1;
    text-align: center;

    font-family: ${({ theme }) => theme.fontFamily.medium};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1em;
    background-color: #fff;

    padding: 1vh 3vw;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.purple};
`;
