import {
  createNavigationContainerRef,
  NavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef =
  createNavigationContainerRef<
    NavigationContainerRef<ReactNavigation.RootParamList>
  >();
