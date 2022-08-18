import { RootStackParamList } from 'routes';

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

  type NavProps<Screen> = NativeStackNavigationProp<RootStackParamList, Screen>;
}
