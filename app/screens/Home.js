import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Block, theme } from 'galio-framework';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { Card } from '../components';
const { width } = Dimensions.get('screen');

const Home = (props) => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <Block flex center>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <SafeAreaView>
          <Block flex>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Guisos', {
                  dia: props.route.params.tabId,
                })
              }
            >
              <Card
                item={{
                  title: 'Guisos',
                  image: require('../assets/imgs/guisos.jpg'),
                  cta: 'Ver platillos',
                  horizontal: true,
                }}
                horizontal
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Sopas', {
                  dia: props.route.params.tabId,
                })
              }
            >
              <Card
                item={{
                  title: 'Sopas',
                  image: require('../assets/imgs/sopas.jpg'),
                  cta: 'Ver platillos',
                  horizontal: true,
                }}
                horizontal
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Guarniciones', {
                  dia: props.route.params.tabId,
                })
              }
            >
              <Card
                item={{
                  title: 'Guarniciones',
                  image: require('../assets/imgs/guarniciones.jpg'),
                  cta: 'Ver platillos',
                  horizontal: true,
                }}
                horizontal
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Antojitos', {
                  dia: props.route.params.tabId,
                })
              }
            >
              <Card
                item={{
                  title: 'Antojitos',
                  image: require('../assets/imgs/antojitos.jpeg'),
                  cta: 'Ver platillos',
                  horizontal: true,
                }}
                horizontal
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Postres', {
                  dia: props.route.params.tabId,
                })
              }
            >
              <Card
                item={{
                  title: 'Postres',
                  image: require('../assets/imgs/postres.jpeg'),
                  cta: 'Ver platillos',
                  horizontal: true,
                }}
                horizontal
              />
            </TouchableOpacity>
          </Block>
        </SafeAreaView>
      </ScrollView>
    </Block>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  enviarNotificacion();
  return token;
}

const enviarNotificacion = async () => {
  let notificacionCerramosEn30 = false;
  let notificacionCerramosEn10 = false;
  let notificacionCerramosEn5 = false;
  let notificacionYaCerramos = false;
  let notificacionAbrimosEn10 = false;
  let notificacionYaAbrimos = false;

  let dia = new Date();
  if (dia.getDay() >= 1 && dia.getDay() <= 5) {
    setInterval(funciones, 15000);
  }

  function funciones() {
    let date = new Date();
    let hora = `${date.getHours()}${date.getMinutes()}`;

    if (hora == 1600 && notificacionCerramosEn30 == false)
      CerramosEn30('Cocinas Aurora', 'Cerramos en 30 minutos');
    else if (hora == 1620 && notificacionCerramosEn10 == false)
      CerramosEn10('Cocinas Aurora', 'Cerramos en 10 minutos');
    else if (hora == 1625 && notificacionCerramosEn5 == false)
      CerramosEn5('Cocinas Aurora', 'Cerramos en 5 minutos');
    else if (hora == 1630 && notificacionYaCerramos == false)
      YaCerramos('Cocinas Aurora', 'Ya cerramos, mañana abrimos a las 9');
    else if (hora == 850 && notificacionAbrimosEn10 == false)
      AbrimosEn10('Cocinas Aurora', 'Abrimos en 10 minutos');
    else if (hora == 90 && notificacionYaAbrimos == false)
      YaAbrimos('Cocinas Aurora', 'Ya abrimos, puedes venir al negocio');
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  function CerramosEn30(titulo, body) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: body,
        data: { data: 'ir a la app' },
      },
      trigger: { seconds: 2 },
    });
    notificacionCerramosEn30 = true;
  }

  function CerramosEn10(titulo, body) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: body,
        data: { data: 'ir a la app' },
      },
      trigger: { seconds: 2 },
    });
    notificacionCerramosEn10 = true;
  }

  function CerramosEn5(titulo, body) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: body,
        data: { data: 'ir a la app' },
      },
      trigger: { seconds: 2 },
    });
    notificacionCerramosEn5 = true;
  }

  function YaCerramos(titulo, body) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: body,
        data: { data: 'ir a la app' },
      },
      trigger: { seconds: 2 },
    });
    notificacionYaCerramos = true;
  }

  function AbrimosEn10(titulo, body) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: body,
        data: { data: 'ir a la app' },
      },
      trigger: { seconds: 2 },
    });
    notificacionAbrimosEn10 = true;
  }

  function YaAbrimos(titulo, body) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: body,
        data: { data: 'ir a la app' },
      },
      trigger: { seconds: 2 },
    });
    notificacionYaAbrimos = true;
  }
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

export default Home;
