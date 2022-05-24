import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native-elements';

const images = [
  require('../assets/imgs/ubicacion_cocina_economica_cocinas_aurora_1.jpg'),
  require('../assets/imgs/ubicacion_cocina_economica_cocinas_aurora_2.jpg'),
  require('../assets/imgs/ubicacion_cocina_economica_cocinas_aurora_3.jpg'),
  require('../assets/imgs/ubicacion_cocina_economica_cocinas_aurora_4.jpg'),
  require('../assets/imgs/comida_del_dia_cocina_economica_cocinas_aurora_1.jpg'),
  require('../assets/imgs/comida_del_dia_cocina_economica_cocinas_aurora_2.jpg'),
  require('../assets/imgs/comida_del_dia_cocina_economica_cocinas_aurora_3.jpg'),
  require('../assets/imgs/ubicacion_cocina_economica_cocinas_aurora_5.jpg'),
  require('../assets/imgs/ubicacion_cocina_economica_cocinas_aurora_6.jpg'),
  require('../assets/imgs/ubicacion_cocina_economica_cocinas_aurora_7.jpg'),
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Visitanos = (props) => {
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

  const [imgActive, setimgActive] = useState(0);

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.viewTitulo}>
          <Text style={!darkApp ? styles.textTitulo : [styles.textTitulo, { color: '#fff' }]}>
            Visitanos
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
        <View style={styles.containerSubTitulo}>
          <Text
            style={!darkApp ? styles.textSubTitulo : [styles.textSubTitulo, { color: '#f5f7fa' }]}
          >
            Ven a conocernos en la mejor cocina económica de Durango
          </Text>
        </View>
        <View style={styles.wrap}>
          <ScrollView
            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
          >
            {images.map((e, index) => (
              <Image
                PlaceholderContent={<ActivityIndicator size="large" color="#2C394B" />}
                key={e}
                resizeMode="stretch"
                style={styles.wrap}
                source={e}
              />
            ))}
          </ScrollView>
          <View style={styles.wrapDot}>
            {images.map((e, index) => (
              <Text key={e} style={imgActive == index ? styles.dotActive : styles.dot}>
                &#x25cf;
              </Text>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTitulo: {
    marginTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  containerSubTitulo: {
    marginTop: 10,
    marginBottom: 60,
    marginHorizontal: 20,
  },
  textSubTitulo: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000',
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.4,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: '#f96332',
  },
  dot: {
    margin: 3,
    color: '#fff',
  },
});

export default Visitanos;
