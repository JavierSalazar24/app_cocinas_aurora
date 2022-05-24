import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Image, Switch, View, Text,Dimensions } from 'react-native';
import { Block, theme } from 'galio-framework';
import Images from '../constants/Images';
import { DrawerItem as DrawerCustomItem } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import nowTheme from '../constants/Theme';
import IconF from 'react-native-vector-icons/FontAwesome';
import { EventRegister } from 'react-native-event-listeners';

const { width, height } = Dimensions.get('screen');

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  useEffect(() => {
    obtenerUsuario();
    obtenerValorDM();

    let eventListener = EventRegister.addEventListener('changeThemeEvent', (data) => {
      setDarkmode(data);
    });

    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  const [estado, setEstado] = useState({
    toggled: '',
  });

  const obtenerValorDM = async () => {
    const darkmodeAsync = await AsyncStorage.getItem('darkmode');
    const booleano = darkmodeAsync == 'true' ? true : false;
    setDarkmode(booleano);
    setEstado({ toggled: darkmodeAsync });
  };
  const [darkmode, setDarkmode] = useState();

  const toggleSwitch = async (value) => {
    setEstado({ toggled: value });
    await AsyncStorage.setItem('darkmode', `${value}`);
  };

  const [usuario, setUsuario] = useState({});

  const obtenerUsuario = async () => {
    const cliente = await AsyncStorage.getItem('usuario');
    setUsuario(JSON.parse(cliente));
  };

  let stateUsuario;
  let screensSinUsuario = [
    'Inicio',
    'Porciones',
    'FAQ',
    'Visitanos',
    'Login',
    'Registrarse',
    'Contactanos',
  ];
  let screensUsuario = ['Inicio', 'Porciones', 'FAQ', 'Visitanos', 'Contactanos', 'Perfil'];

  return (
    <Block
      style={darkmode ? styles.containerDarkmode : styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {usuario == null
            ? screensSinUsuario.map((item, index) => {
                return (
                  <DrawerCustomItem
                    title={item}
                    key={index}
                    navigation={navigation}
                    focused={state.index == index ? true : false}
                  />
                );
              })
            : screensUsuario.map((item, index) => {
                return (
                  <DrawerCustomItem
                    {...(state.routeNames[6] === item
                      ? (stateUsuario = state.index - 2)
                      : (stateUsuario = state.index))}
                    title={item}
                    key={index}
                    navigation={navigation}
                    focused={stateUsuario == index ? true : false}
                  />
                );
              })}
          {usuario != null ? (
            <DrawerCustomItem title="CERRAR SESIÓN" navigation={navigation} />
          ) : (
            console.log('')
          )}
          <DrawerCustomItem title="SITIO WEB" navigation={navigation} />
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: height <= 640 ? 50 : height <= 400 ? 80 : 0,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 18,
              }}
            >
              <IconF
                size={18}
                name="sun-o"
                style={{ paddingRight: 10, opacity: 0.5, color: '#fff' }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'montserrat-regular',
                  textTransform: 'uppercase',
                  fontWeight: '300',
                  fontSize: 12,
                }}
              >
                MODO OSCURO
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#ffa500', true: '#343d5b' }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(val) => {
                toggleSwitch(val);
                EventRegister.emit('changeThemeEvent', val);
              }}
              value={estado.toggled == 'true' ? true : estado.toggled}
            />
          </View>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  containerDarkmode: {
    backgroundColor: '#353535',
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 80,
    width: 80,
  },
});

export default CustomDrawerContent;
