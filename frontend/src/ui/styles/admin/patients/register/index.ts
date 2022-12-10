import { Form } from 'formik';
import styled from 'styled-components';

export const Styling = styled.div``;

export const RegisterForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;

export const FieldGroup = styled.div`
    display: flex;
    align-items: space-between;
`;

export const LabelInput = styled.div`
    display: flex;
    flex-direction: column;

    margin-bottom: 1vh;

    & + & {
        margin-left: 2vw;
    }
`;
