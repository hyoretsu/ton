import { Form } from 'formik';
import styled from 'styled-components';

export const FormWrapper = styled(Form)`
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

export const ErrorText = styled.p`
    color: #f00;
`;

export const HematologyDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1vw;
`;
