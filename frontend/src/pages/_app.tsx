/* eslint-disable camelcase */
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { siteName as site_name } from './_document';

import '@public/global.css';
import '@public/fonts.css';

const url = 'https://e-odontologia.vercel.app';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
    const { pathname } = useRouter();

    return (
        <>
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
        </>
    );
};

export default MyApp;
