import { RootStackParamList } from 'routes';

interface RouteParams<Name, T> {
 route: {
  params: Record<Name, T>;
 };
}

declare global {
 namespace ReactNavigation {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RootParamList extends RootStackParamList {}
 }

 type NavProps<Screen> = NativeStackNavigationProp<RootStackParamList, Screen>;
}
