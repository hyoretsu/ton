import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'routes/app.routes';

interface RouteParams<Params> {
    route: {
        params?: Params;
    };
}

declare global {
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface RootParamList extends RootStackParamList {}
    }

    type NavProps<Screen> = NativeStackScreenProps<RootStackParamList, Screen>;
}
