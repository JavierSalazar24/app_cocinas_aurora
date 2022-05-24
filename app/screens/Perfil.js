import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  View,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { Images, nowTheme } from '../constants';
import { Select } from '../components';
import { Input } from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
const baseUrl = 'https://cocinas-aurora-app.herokuapp.com/';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Perfil = () => {
  const [disabled, setDisabled] = useState(false);

  const [darkApp, setDarkApp] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('darkmode').then((result) => {
      const booleano = result == 'true' ? true : false;
      setDarkApp(booleano);
    });
    isConnected();
    obtenerUsuario();
    let eventListener = EventRegister.addEventListener('changeThemeEvent', (data) => {
      setDarkApp(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  const [conectado, setConectado] = useState(false);

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
      obtenerUsuario();
    });
  };

  const [usuario, setUsuario] = useState({});

  const obtenerUsuario = async () => {
    const cliente = await AsyncStorage.getItem('usuario');
    setUsuario(JSON.parse(cliente));
    setLoading(false);
  };

  const handleChangeText = (nom, nombres, ape, apellidos, email, correo) => {
    setUsuario({ ...usuario, [nombres]: nom, [apellidos]: ape, [correo]: email });
  };

  const [loading, setLoading] = useState(true);

  const actualizarUsuario = async () => {
    const nombres = usuario.nombres.trim();
    const apellidos = usuario.apellidos.trim();
    const correo = usuario.correo;
    const validarNombres = validarSoloLetras(nombres);
    const validarApellidos = validarSoloLetras(apellidos);
    if (nombres === '' || apellidos === '') {
      Alert.alert('Todos los campos son obligatorios');
    } else if (nombres.length < 3) {
      Alert.alert('Por favor ingresa un nombre mayor a 2 carácteres');
    } else if (apellidos.length < 3) {
      Alert.alert('Por favor ingresa un apellido mayor a 2 carácteres');
    } else if (!validarNombres) {
      Alert.alert('Por favor ingresa un nombre valido');
    } else if (!validarApellidos) {
      Alert.alert('Por favor ingresa un apellido valido');
    } else {
      setDisabled(false);
      const response = await axios.put(baseUrl + 'actualizaUsuario/' + correo, {
        nombres,
        apellidos,
      });
      const { data } = response;
      await AsyncStorage.setItem('usuario', JSON.stringify(data.usuarioActualizado));
      obtenerUsuario();
      setLoading(false);
      Alert.alert('Información actualizada');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

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

  return (
    <ScrollView
      style={{ backgroundColor: darkApp ? '#474747' : '#fff' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <SafeAreaView>
        <Block
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: darkApp ? '#474747' : '#fff',
          }}
        >
          <Block flex={0.6}>
            <ImageBackground
              source={Images.PerfilBackground}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <Block flex style={styles.profileCard}>
                <Block
                  style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}
                >
                  <Block middle style={{ top: height * 0.1 }}>
                    <Image
                      source={
                        typeof usuario.foto == 'undefined'
                          ? Images.PerfilPicture
                          : { uri: usuario.foto }
                      }
                      style={styles.avatar}
                    />
                  </Block>
                  <Block style={{ top: height * 0.165 }}>
                    <Block middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          marginBottom: theme.SIZES.BASE / 2,
                          fontWeight: '900',
                          fontSize: 26,
                          textAlign: 'center',
                        }}
                        color="#fff"
                      >
                        {usuario.nombres} {usuario.apellidos}
                      </Text>

                      <Text
                        size={16}
                        color="#fff"
                        style={{
                          marginTop: 5,
                          fontFamily: 'montserrat-bold',
                          lineHeight: 20,
                          fontWeight: 'bold',
                          fontSize: 18,
                          opacity: 0.8,
                        }}
                      >
                        {usuario.correo}
                      </Text>
                    </Block>
                  </Block>
                </Block>
                <Block
                  middle
                  row
                  style={{ position: 'absolute', width: width, top: height * 0.6 - 32, zIndex: 99 }}
                >
                  <Button
                    color={nowTheme.COLORS.PRIMARY}
                    style={disabled ? styles.btnGuardar : styles.btnEditar}
                    textStyle={{ fontSize: 17 }}
                    round
                    onPress={() =>
                      typeof usuario.redSocial != 'undefined'
                        ? usuario.redSocial == 'google'
                          ? Alert.alert('No puede editar su perfil de google desde aquí.')
                          : Alert.alert('No puede editar su perfil de facebook desde aquí.')
                        : disabled
                        ? (actualizarUsuario(), setLoading(true))
                        : setDisabled(true)
                    }
                  >
                    {disabled ? 'Guardar Cambios' : 'Editar perfil'}
                  </Button>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
          <Block flex={0.4} style={styles.cajaInputs}>
            <Text
              style={
                !darkApp
                  ? disabled
                    ? styles.label
                    : styles.labelDisabled
                  : disabled
                  ? [styles.label, { color: '#FFF' }]
                  : [styles.labelDisabled, { color: '#bbbbbb' }]
              }
            >
              Nombre:
            </Text>
            <Block style={disabled ? styles.containerInput : styles.containerInputDisabled}>
              <Input
                placeholder="Nombres"
                value={usuario.nombres}
                editable={disabled}
                color={!darkApp ? (disabled ? '#000' : '#999') : disabled ? '#000' : '#bbbbbb'}
                onChangeText={(nom) => handleChangeText(nom, 'nombres')}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                leftIcon={
                  <Icon5
                    size={16}
                    name="user-edit"
                    style={
                      !darkApp
                        ? disabled
                          ? styles.inputIcons
                          : styles.inputIconsDisabled
                        : disabled
                        ? styles.inputIcons
                        : [styles.inputIconsDisabled, { color: '#bbbbbb' }]
                    }
                  />
                }
              />
            </Block>

            <Text
              style={
                !darkApp
                  ? disabled
                    ? styles.label
                    : styles.labelDisabled
                  : disabled
                  ? [styles.label, { color: '#FFF' }]
                  : [styles.labelDisabled, { color: '#bbbbbb' }]
              }
            >
              Apellidos:
            </Text>
            <Block style={disabled ? styles.containerInput : styles.containerInputDisabled}>
              <Input
                placeholder="Apellidos"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                value={usuario.apellidos}
                editable={disabled}
                color={!darkApp ? (disabled ? '#000' : '#999') : disabled ? '#000' : '#bbbbbb'}
                onChangeText={(ape) => handleChangeText(ape, 'apellidos')}
                leftIcon={
                  <IconM
                    size={16}
                    name="text-fields"
                    style={
                      !darkApp
                        ? disabled
                          ? styles.inputIcons
                          : styles.inputIconsDisabled
                        : disabled
                        ? styles.inputIcons
                        : [styles.inputIconsDisabled, { color: '#bbbbbb' }]
                    }
                  />
                }
              />
            </Block>
          </Block>
        </Block>
      </SafeAreaView>
    </ScrollView>
  );

  // Válidamos solo letras
  function validarSoloLetras(valor) {
    if (!/^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ. ]*$/.test(valor)) {
      return false;
    }
    return true;
  }
};

const styles = StyleSheet.create({
  label: {
    color: '#000',
    marginLeft: 6,
    marginTop: 10,
    marginBottom: 10,
    marginBottom: 10,
  },
  labelDisabled: {
    color: '#999',
    marginLeft: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  labelNoti: {
    color: '#000',
    marginLeft: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  labelDisabledNoti: {
    color: '#999',
    marginLeft: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  qty: {
    width: 140,
    backgroundColor: nowTheme.COLORS.NEUTRAL,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
  },
  qtyDisabled: {
    width: 140,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: '#dbdbdb80',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 10,
  },
  profileContainer: {
    width,
    height: height - 200,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
  },
  btnEditar: {
    width: 125,
    height: 44,
    marginHorizontal: 5,
    elevation: 0,
    borderRadius: 10,
  },
  btnGuardar: {
    width: 160,
    height: 44,
    marginHorizontal: 5,
    elevation: 0,
    borderRadius: 10,
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
  cajaInputs: {
    marginTop: height >= 857 ? -90 : height >= 760 ? -60 : height >= 640 ? 0 : 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  inputIcons: {
    marginHorizontal: 10,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputIconsDisabled: {
    marginHorizontal: 10,
    color: '#999',
  },
  containerInput: {
    borderRadius: 10,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: '#FFFFFF',
    marginBottom: height >= 857 ? 30 : height >= 760 ? 15 : height >= 640 ? 25 : 25,
    height: 48,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
    borderWidth: 1,
  },
  containerInputDisabled: {
    borderRadius: 10,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: '#dbdbdb80',
    marginBottom: height >= 857 ? 30 : height >= 760 ? 15 : height >= 640 ? 25 : 25,
    height: 48,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E3E3E3',
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
});

export default Perfil;
