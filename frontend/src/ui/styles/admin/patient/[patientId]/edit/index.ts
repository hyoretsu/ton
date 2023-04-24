import { Form } from 'formik';
import styled from 'styled-components';

export const Styling = styled.div``;

export const EditPatientForm = styled(Form)`
    display: flex;
    flex-direction: column;

    > div:first-child,
    div + div {
        display: flex;
        justify-content: space-between;

        width: 30vw;

        margin-bottom: 2vh;
    }
`;
