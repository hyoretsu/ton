import { Form } from 'formik';
import styled from 'styled-components';

export const Styling = styled.div``;

export const RegisterForm = styled(Form)`
    display: flex;
    flex-direction: column;

    width: 40vw;

    input {
        width: 100%;
    }
`;

export const FormBody = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1vh 2vw;
`;

export const LabelInput = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HematologyDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1vw;
`;
