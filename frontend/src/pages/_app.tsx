/* eslint-disable camelcase */
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';

import { siteName } from './_document';

import '@public/global.css';
import '@public/fonts.css';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
    return (
        <>
            <DefaultSeo
                defaultTitle={siteName}
                titleTemplate={`%s | ${siteName}`}
                dangerouslySetAllPagesToNoFollow
                dangerouslySetAllPagesToNoIndex
            />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
