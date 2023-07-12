import 'rn-css';
// import 'styled-components';

import mainTheme from '@theme';

// declare module 'styled-components' {
declare module 'rn-css' {
    type MainTheme = typeof mainTheme;

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends MainTheme {}
}
