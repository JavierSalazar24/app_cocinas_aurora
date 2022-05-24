import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Block, theme } from 'galio-framework';
import NetInfo from '@react-native-community/netinfo';
import { Card } from '../components';
const { width } = Dimensions.get('screen');
import axios from 'axios';

const baseUrl = 'https://cocinas-aurora-app.herokuapp.com/';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Antojitos = (props) => {
  useEffect(() => {
    isConnected();
    obtenerAntojitos();
  }, []);

  const [conectado, setConectado] = useState(true);

  const isConnected = () => {
    NetInfo.fetch().then((state) => {
      setConectado(state.isConnected);
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      isConnected();
      obtenerAntojitos();
    });
  };

  const [comidas, setComida] = useState([]);

  const [loading, setLoading] = useState(true);

  const obtenerAntojitos = async () => {
    const dia = props.route.params.dia;
    const response = await axios.get(baseUrl + 'obtenerAntojitos/' + dia);
    const { data } = response;
    setComida(data.comidas);
    setLoading(false);
  };

  if (!conectado) {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <SafeAreaView>
          <View style={styles.conectado}>
            <ActivityIndicator size="small" color="#F0F0CB" />
            <Text style={{ color: '#FFF', paddingLeft: 5 }}>Sin internet</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <Block flex center style={styles.antojitos}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <SafeAreaView>
          {comidas.length != 0 ? (
            <Block flex>
              {comidas.map((comida) => (
                <Card
                  key={comida._id}
                  item={{
                    title2: `$${comida.precio} pesos MXN. ${comida.pieza_orden}.`,
                    image: `https://cocinas-aurora.herokuapp.com/img_alimentos/${comida.imagen}`,
                    subtitle: `${comida.nombre}`,
                    description: `${comida.descripcion}`,
                    horizontal: true,
                  }}
                  full
                />
              ))}
            </Block>
          ) : (
            <Block style={styles.containerVacio}>
              <Text style={styles.containerVacioText}>Sin antojitos!</Text>
            </Block>
          )}
        </SafeAreaView>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  antojitos: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conectado: {
    flexDirection: 'row',
    backgroundColor: '#FF2626',
    paddingVertical: 6,
    justifyContent: 'center',
  },
  containerVacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  containerVacioText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#B61919',
  },
});

export default Antojitos;
