import 'rn-css';
// import 'styled-components';

import mainTheme from '../../ui/theme/main';

declare module 'rn-css' {
    type MainTheme = typeof mainTheme;

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends MainTheme {}
}
