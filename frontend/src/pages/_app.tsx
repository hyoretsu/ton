/* eslint-disable camelcase */
import { AuthProvider } from 'data/contexts/auth';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

import { siteName as site_name } from './_document';

import '@public/global.css';
import '@public/fonts.css';
import '@public/overrides.css';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
// import 'react-datepicker/dist/react-datepicker.css';

const url = 'https://ton.vercel.app';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
    const { pathname, replace } = useRouter();

    useEffect(() => {
        const execute = async (): Promise<void> => {
            if (pathname.includes('/admin') && !localStorage.getItem('@ton:user')) {
                replace('/login');
            }
        };

        execute();
    }, [pathname, replace]);

    return (
        <AuthProvider>
            <DefaultSeo
                defaultTitle={site_name}
                facebook={{ appId: String(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID) }}
                openGraph={{
                    images: [
                        {
                            url: `${url}/images/opengraph.png`,
                            width: 1200,
                            height: 627,
                            alt: site_name,
                        },
                    ],
                    site_name,
                    type: 'website',
                    url: url + pathname,
                }}
                titleTemplate={`%s | ${site_name}`}
                twitter={{
                    cardType: 'summary_large_image',
                    site: `${process.env.NEXT_PUBLIC_SITE_OWNER}` || '@hyoretsu',
                }}
            />
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp;
