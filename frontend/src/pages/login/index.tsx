import { useAuth } from 'data/contexts/auth';
import { Field, Formik } from 'formik';
import { NextSeo } from 'next-seo';

import api from '@api';

import { LoginForm, Styling } from '@styles/login';

interface FormFields {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { finishLogin } = useAuth();

    const login = async (fields: FormFields): Promise<void> => {
        const {
            data: { token, user },
        } = await api.post('/users/login', fields);

        finishLogin({ token, user });
    };

    return (
        <>
            <NextSeo nofollow noindex />
            <Styling>
                <Formik initialValues={{ email: '', password: '' }} onSubmit={login}>
                    <LoginForm>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" />
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        <button type="submit">Entrar</button>
                    </LoginForm>
                </Formik>
            </Styling>
        </>
    );
};

export default Login;
