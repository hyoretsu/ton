import { Form } from 'formik';
import styled from 'styled-components';

export const Styling = styled.div``;

export const PeriodicInfoForm = styled(Form)`
    display: flex;
    flex-direction: column;

    > div:first-child,
    div + div {
        display: flex;

        margin-bottom: 2vh;

        input {
            margin-left: auto;
        }
    }
`;
