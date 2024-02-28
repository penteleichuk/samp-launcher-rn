import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  AnimatedTabBarNavigator,
  DotSize,
} from 'react-native-animated-nav-tab-bar';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setModeType } from '../actions/settingsActions';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { DonateScreen } from '../screens/DonateScreen';
import { ErrorScreen } from '../screens/ErrorScreen';
import { GameScreen } from '../screens/GameScreen';
import { InitiationScreen } from '../screens/InitiationScreen';
import { DownloadScreen } from '../screens/LoaderScreen/DownloadScreen';
import { DownloadStartScreen } from '../screens/LoaderScreen/DownloadStartScreen';
import { LauncherDownloadScreen } from '../screens/LoaderScreen/LauncherDownloadScreen';
import { LauncherUpdateScreen } from '../screens/LoaderScreen/LauncherUpdateScreen';
import { UpdateScreen } from '../screens/LoaderScreen/UpdateScreen';
import { UpdateStartScreen } from '../screens/LoaderScreen/UpdateStartScreen';
import { ModeScreen } from '../screens/ModeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import * as Icons from './../assets/svg';
import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

export const NavigationRouter = React.memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModeType, setIsModeType] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    AsyncStorage.getItem('modeType')
      .then(res => {
        if (res !== null) {
          dispatch(setModeType(+res));
          setIsModeType(true);
        }
      })
      .catch(() => {
        setIsModeType(false);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  if (!isLoading) {
    return <></>;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        onReady={() => RNBootSplash.hide()}
        ref={navigationRef}
        theme={DarkTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <BottomSheetModalProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                headerTransparent: true,
                gestureEnabled: false,
                animationTypeForReplace: 'push',
                animationDuration: 350,
                animation: 'flip',
              }}
              initialRouteName={isModeType ? 'Initiation' : 'ModeScreen'}>
              <Stack.Screen name="Main" component={TabBarNavigation} />
              <Stack.Screen name="Error" component={ErrorScreen} />
              <Stack.Screen name="Initiation" component={InitiationScreen} />
              <Stack.Screen name="ModeScreen" component={ModeScreen} />
              <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
              <Stack.Screen
                name="UpdateStartScreen"
                component={UpdateStartScreen}
              />
              <Stack.Screen name="DownloadScreen" component={DownloadScreen} />
              <Stack.Screen
                name="DownloadStartScreen"
                component={DownloadStartScreen}
              />
              <Stack.Screen
                name="LauncherDownloadScreen"
                component={LauncherDownloadScreen}
              />
              <Stack.Screen
                name="LauncherUpdateScreen"
                component={LauncherUpdateScreen}
              />
            </Stack.Navigator>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
});

const Tabs = AnimatedTabBarNavigator();
export const TabBarNavigation = React.memo(() => {
  return (
    <Tabs.Navigator
      initialRouteName="Играть"
      backBehavior={'initialRoute'}
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#b6c4ee7f',
        activeBackgroundColor: '#6b8afd',
      }}
      appearance={{
        shadow: false,
        floating: true,
        dotSize: DotSize.MEDIUM,
        tabBarBackground: '#212231',
      }}>
      <Tabs.Screen
        name="Донат"
        component={DonateScreen}
        options={{
          headerShown: true,
          animation: 'fade',
          headerTransparent: true,
          tabBarIcon: ({ color, size }: any) => (
            <Icons.WalletSvg width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Играть"
        component={GameScreen}
        options={{
          headerShown: true,
          animation: 'fade',
          headerTransparent: true,
          tabBarIcon: ({ color, size }: any) => (
            <Icons.PlaySvg width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Настройки"
        component={SettingsScreen}
        options={{
          headerShown: true,
          animation: 'fade',
          headerTransparent: true,
          tabBarIcon: ({ color, size }: any) => (
            <Icons.SettingSvg width={size} height={size} fill={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
});
