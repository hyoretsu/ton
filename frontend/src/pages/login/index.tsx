import { Field, Formik } from 'formik';
import { NextSeo } from 'next-seo';

import api from '@api';

import { LoginForm, Styling } from '@styles/login';

interface FormFields {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const login = async (fields: FormFields): Promise<void> => {
        const { data } = await api.post('/users/login', fields);

        localStorage.setItem('@eOdontologia:user', JSON.stringify(data.user));
        localStorage.setItem('@eOdontologia:token', data.token);
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
