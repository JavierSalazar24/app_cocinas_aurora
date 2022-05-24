import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import darkTheme from './constants/dark';
import Screens from './navigation/Screens';
import { Images } from './constants';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground,
];

export default function App(props) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [darkApp, setDarkApp] = useState();

  useEffect(() => {
    AsyncStorage.getItem('darkmode').then((result) => {
      const booleano = result == 'true' ? true : false;
      setDarkApp(booleano);
    });
    let eventListener = EventRegister.addEventListener('changeThemeEvent', (data) => {
      setDarkApp(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  const appTheme = darkApp ? darkTheme : DefaultTheme;

  const _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
    });

    setFontLoaded(true);
  };

  const _handleLoadingError = (error) => {
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    if (fontLoaded) {
      setIsLoadingComplete(true);
    }
  };

  return !isLoadingComplete ? (
    <AppLoading
      startAsync={_loadResourcesAsync}
      onError={_handleLoadingError}
      onFinish={_handleFinishLoading}
    />
  ) : (
    <NavigationContainer theme={appTheme}>
      <GalioProvider>
        <Block flex>
          <Screens />
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
}
