import { Form } from 'formik';
import styled from 'styled-components';

export const Styling = styled.div``;

export const RegisterForm = styled(Form)`
    display: flex;
    flex-direction: column;

    width: 40vw;
`;

export const FieldGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2vw;
`;

export const LabelInput = styled.div`
    display: flex;
    flex-direction: column;

    margin-bottom: 1vh;
`;
