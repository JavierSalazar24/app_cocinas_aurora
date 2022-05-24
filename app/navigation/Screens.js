import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import Inicio from '../screens/Home';
import Guisos from '../screens/Guisos';
import Sopas from '../screens/Sopas';
import Guarniciones from '../screens/Guarniciones';
import Antojitos from '../screens/Antojitos';
import Postres from '../screens/Postres';
import Perfil from '../screens/Perfil';
import Login from '../screens/Login';
import Registrarse from '../screens/Registrarse';
import Porciones from '../screens/Porciones';
import Contactanos from '../screens/Contactanos';
import FAQ from '../screens/Faq';
import Visitanos from '../screens/Visitanos';
import Principal from '../screens/Principal';
// drawer
import CustomDrawerContent from './Menu';
// header for screens
import { Header } from '../components';
import { nowTheme, tabs } from '../constants';
const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function PorcionesStack(props) {
  const [darkApp, setDarkApp] = useState(false);
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
  return (
    <Stack.Navigator initialRouteName="Porciones" mode="card" headerMode="screen">
      <Stack.Screen
        name="Porciones"
        component={Porciones}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              iconColor={darkApp ? '#fff' : '#000'}
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ContactanosStack(props) {
  const [darkApp, setDarkApp] = useState(false);
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
  return (
    <Stack.Navigator initialRouteName="Contactanos" mode="card" headerMode="screen">
      <Stack.Screen
        name="Contactanos"
        component={Contactanos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              iconColor={darkApp ? '#fff' : '#000'}
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function VisitanosStack(props) {
  const [darkApp, setDarkApp] = useState(false);
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
  return (
    <Stack.Navigator initialRouteName="Visitanos" mode="card" headerMode="screen">
      <Stack.Screen
        name="Visitanos"
        component={Visitanos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              iconColor={darkApp ? '#fff' : '#000'}
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function FAQStack(props) {
  const [darkApp, setDarkApp] = useState(false);
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
  return (
    <Stack.Navigator initialRouteName="FAQ" mode="card" headerMode="screen">
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              iconColor={darkApp ? '#fff' : '#000'}
              titleColor={darkApp ? '#fff' : '#000'}
              bgColor={darkApp ? '#303030' : '#fff'}
              bgTab={darkApp ? '#303030' : '#fff'}
              tabs={tabs.faq}
              navigation={navigation}
              scene={scene}
              title={
                typeof scene.route.params != 'undefined'
                  ? scene.route.params.tabId
                  : 'Métodos de pago'
              }
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {
  return (
    <Stack.Navigator initialRouteName="Login" mode="card" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: ({ navigation, scene }) => (
            <Header white transparent title="" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function RegistrarseStack(props) {
  return (
    <Stack.Navigator initialRouteName="Registrarse" mode="card" headerMode="screen">
      <Stack.Screen
        name="Registrarse"
        component={Registrarse}
        options={{
          header: ({ navigation, scene }) => (
            <Header white transparent title="" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function PerfilStack(props) {
  return (
    <Stack.Navigator initialRouteName="Perfil" mode="card" headerMode="screen">
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white title="" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function InicioStack(props) {
  const [darkApp, setDarkApp] = useState(false);
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
  const { colors } = useTheme();
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              iconColor={darkApp ? '#fff' : '#000'}
              titleColor={darkApp ? '#fff' : '#000'}
              bgColor={darkApp ? '#303030' : '#fff'}
              bgTab={darkApp ? '#303030' : '#fff'}
              navigation={navigation}
              scene={scene}
              tabs={tabs.dias}
              title="Cocinas Aurora"
            />
          ),
          headerTintColor: darkApp ? '#fff' : '#000',
          cardStyle: { backgroundColor: colors.card },
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Guisos"
        component={Guisos}
        options={{
          title: 'Guisos',
          headerStyle: {
            backgroundColor: darkApp ? '#303030' : '#fff',
          },
          headerTintColor: darkApp ? '#fff' : '#000',
        }}
      />
      <Stack.Screen
        name="Sopas"
        component={Sopas}
        options={{
          title: 'Sopas',
          headerStyle: {
            backgroundColor: darkApp ? '#303030' : '#fff',
          },
          headerTintColor: darkApp ? '#fff' : '#000',
        }}
      />
      <Stack.Screen
        name="Guarniciones"
        component={Guarniciones}
        options={{
          title: 'Guarniciones',
          headerStyle: {
            backgroundColor: darkApp ? '#303030' : '#fff',
          },
          headerTintColor: darkApp ? '#fff' : '#000',
        }}
      />
      <Stack.Screen
        bgColor={'red'}
        name="Antojitos"
        component={Antojitos}
        options={{
          title: 'Antojitos',
          headerStyle: {
            backgroundColor: darkApp ? '#303030' : '#fff',
          },
          headerTintColor: darkApp ? '#fff' : '#000',
        }}
      />
      <Stack.Screen
        name="Postres"
        component={Postres}
        options={{
          title: 'Postres',
          headerStyle: {
            backgroundColor: darkApp ? '#303030' : '#fff',
          },
          headerTintColor: darkApp ? '#fff' : '#000',
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Inicio"
    >
      <Drawer.Screen name="Inicio" component={InicioStack} />
      <Drawer.Screen name="Porciones" component={PorcionesStack} />
      <Drawer.Screen name="FAQ" component={FAQStack} />
      <Drawer.Screen name="Visitanos" component={VisitanosStack} />
      <Drawer.Screen name="Login" component={LoginStack} />
      <Drawer.Screen name="Registrarse" component={RegistrarseStack} />
      <Drawer.Screen name="Contactanos" component={ContactanosStack} />
      <Drawer.Screen name="Perfil" component={PerfilStack} />
    </Drawer.Navigator>
  );
}

export default function PrincipalStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Principal"
        component={Principal}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
