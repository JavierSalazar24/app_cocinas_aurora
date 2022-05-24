import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { nowTheme } from '../constants';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Contactanos = (props) => {
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

  const region = {
    latitude: 24.014918,
    longitude: -104.667566,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const llamar = async () => {
    await Linking.openURL('tel:6188127776');
  };

  const direccion = async () => {
    await Linking.openURL(
      'https://www.google.com/maps/place/Cocinas+Aurora/@24.015187,-104.667593,20z/data=!4m5!3m4!1s0x0:0x2737e01c60bf9463!8m2!3d24.0152178!4d-104.6675796?hl=es'
    );
  };

  const email1 = async () => {
    const separador = Platform.OS == 'android' ? '?' : '&';
    await Linking.openURL(`mailto:cocinaaurora@gmail.com${separador}subject=Dudas`);
  };

  const email2 = async () => {
    const separador = Platform.OS == 'android' ? '?' : '&';
    await Linking.openURL(`mailto:cocinasaurora@gmail.com${separador}subject=Dudas`);
  };

  const facebook = async () => {
    await Linking.openURL('https://www.facebook.com/Cocina-Aurora-105747607811097');
  };

  const whatsapp = async () => {
    await Linking.openURL('https://wa.me/526188127776?text=Me%20interesa%20algo%20del%20men%C3%BA');
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={!darkApp ? styles.container : [styles.container, { backgroundColor: '#2c2c2c' }]}
        >
          <StatusBar hidden />
          <View style={styles.cardText}>
            <View style={styles.viewTitulo}>
              <Text style={!darkApp ? styles.textTitulo : [styles.textTitulo, { color: '#fff' }]}>
                Contáctanos
              </Text>
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: !darkApp ? 'rgba(225, 202, 0, 0.986)' : 'rgba(255,236,66,.986)',
                  margin: 10,
                  width: 60,
                }}
              ></View>
            </View>
            <View>
              <TouchableOpacity onPress={() => llamar()}>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#b4b4b4' }]}>
                  <IconF size={16} name="phone" style={styles.styleIcon} />
                  {'   '}
                  Pedidos al 618-812-77-76
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => direccion()}>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#b4b4b4' }]}>
                  <Icon5 size={16} name="map-marker-alt" style={styles.styleIcon} />
                  {'   '}
                  Juan E. García #1117, C.P 34139, Victoria de Durango, Durango, México.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => email1()}>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#b4b4b4' }]}>
                  <IconM size={16} name="email-open" style={styles.styleIcon} />
                  {'   '}
                  cocinasaurora@gmail.com
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => email2()}>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#b4b4b4' }]}>
                  <IconM size={16} name="email-open" style={styles.styleIcon} />
                  {'   '}
                  cocinaaurora@gmail.com
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerIcons}>
              <TouchableOpacity style={styles.containerIcon} onPress={() => facebook()}>
                <IconF size={16} name="facebook" style={styles.iconFace} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.containerIcon} onPress={() => whatsapp()}>
                <IconF size={16} name="whatsapp" style={styles.iconWhats} />
              </TouchableOpacity>
            </View>
          </View>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            initialRegion={region}
            showUserLocation={true}
            followUserLocation={true}
            zoomControlEnabled={true}
          >
            <Marker coordinate={{ latitude: 24.015187, longitude: -104.667593 }} />
          </MapView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 90,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  cardText: {
    paddingTop: height * 0.34,
    paddingHorizontal: 40,
  },
  viewTitulo: {
    marginTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  textCard: {
    paddingVertical: 8,
    color: '#000',
  },
  styleIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    color: nowTheme.COLORS.ERROR,
    marginRight: 17,
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20,
  },
  containerIcon: {
    backgroundColor: '#e5e5e5',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFace: {
    color: '#395b98',
  },
  iconTwit: {
    color: '#2ca7e0',
  },
  iconInsta: {
    color: '#E1306C',
  },
  iconWhats: {
    color: '#00bb2d',
  },
});

export default Contactanos;
