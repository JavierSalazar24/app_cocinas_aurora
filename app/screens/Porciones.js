import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, Image, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Porciones = (props) => {
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
  const porciones = ['1/4', '1/2', '1 Litro', 'Orden'];
  const imagenes = ['cuarto.png', 'medio.png', 'litro.png', 'charola.png'];
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.containerTitulo}>
            <Text style={!darkApp ? styles.tituloTexto : [styles.tituloTexto, { color: '#fff' }]}>
              Porciones
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
          {porciones.map((porcion, index) => {
            return (
              <View style={styles.containerCard} key={index}>
                <Card
                  containerStyle={
                    !darkApp
                      ? styles.card
                      : [styles.card, { backgroundColor: '#474747', borderColor: '#474747' }]
                  }
                >
                  <Card.Title
                    style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}
                  >
                    {porcion}
                  </Card.Title>
                  <Card.Divider />
                  <View style={styles.imageContainer}>
                    {imagenes[index] == 'charola.png' ? (
                      <View>
                        <Image
                          style={styles.imageCardCharola}
                          resizeMode="cover"
                          source={require('../assets/imgs/charola.png')}
                        />
                      </View>
                    ) : (
                      <Image
                        style={styles.imageCard}
                        resizeMode="cover"
                        source={
                          imagenes[index] == 'cuarto.png'
                            ? require('../assets/imgs/cuarto.png')
                            : imagenes[index] == 'medio.png'
                            ? require('../assets/imgs/medio.png')
                            : imagenes[index] == 'litro.png'
                            ? require('../assets/imgs/litro.png')
                            : require('../assets/imgs/cuarto.png')
                        }
                      />
                    )}
                  </View>
                </Card>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTitulo: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloTexto: {
    paddingTop: 40,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
  },
  containerCard: {
    marginBottom: 45,
  },
  titleCard: {
    fontSize: 20,
    color: '#000',
  },
  imageCard: {
    width: 180,
    height: 180,
  },
  imageCardCharola: {
    width: 250,
    height: 180,
  },
});

export default Porciones;
