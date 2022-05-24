import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Linking,
  View,
  SafeAreaView,
  CheckBox,
} from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import Icon from 'react-native-vector-icons/Zocial';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Foundation';
import IconI from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { Images, nowTheme } from '../constants';
import axios from 'axios';

const baseUrl = 'https://cocinas-aurora-app.herokuapp.com/';

const { width, height } = Dimensions.get('screen');

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Registrarse = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    isConnected();
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
      setLoading(false);
    });
  };

  const initalState = {
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
  };
  const [state, setState] = useState(initalState);

  const handleChangeText = (nom, nombres, ape, apellidos, email, correo, pass, password) => {
    setState({ ...state, [nombres]: nom, [apellidos]: ape, [correo]: email, [password]: pass });
  };

  const [nombresVacio, setNombresVacio] = useState(false);
  const [nombresLength, setNombresLength] = useState(false);
  const [formatoNombres, setFormatoNombres] = useState(false);
  const [apellidosVacio, setApellidosVacio] = useState(false);
  const [apellidosLength, setApellidosLength] = useState(false);
  const [formatoApellidos, setFormatoApellidos] = useState(false);
  const [emailVacio, setEmailVacio] = useState(false);
  const [formatoEmail, setFormatoEmail] = useState(false);
  const [passwordVacia, setPasswordVacia] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const registrarse = async () => {
    const nombres = state.nombres.trim();
    const apellidos = state.apellidos.trim();
    const correo = state.correo.trim();
    let password = state.password.trim();

    const validarEmail = validarCorreo(correo);
    const validarNombres = validarSoloLetras(nombres);
    const validarApellidos = validarSoloLetras(apellidos);

    if (nombres == '' && apellidos == '' && correo == '' && password == '') {
      setNombresVacio(true);
      setApellidosVacio(true);
      setEmailVacio(true);
      setPasswordVacia(true);
    }
    if (nombres == '') {
      setNombresVacio(true);
    }
    if (apellidos == '') {
      setApellidosVacio(true);
    }
    if (correo == '') {
      setEmailVacio(true);
    }
    if (password == '') {
      setPasswordVacia(true);
    }
    if (nombres.length < 3) {
      setNombresLength(true);
    }
    if (apellidos.length < 3) {
      setApellidosLength(true);
    }
    if (!validarNombres) {
      setFormatoNombres(true);
    }
    if (!validarApellidos) {
      setFormatoApellidos(true);
    }
    if (!validarEmail) {
      setFormatoEmail(true);
    }
    if (password.length < 8) {
      setPasswordLength(true);
    }

    if (
      nombres.length >= 3 &&
      apellidos.length >= 3 &&
      correo.length > 0 &&
      password.length > 0 &&
      validarNombres &&
      validarApellidos &&
      validarEmail &&
      password.length >= 8
    ) {
      password = md5(password);
      const response = await axios.post(baseUrl + 'registrarse', {
        nombres,
        apellidos,
        correo,
        password,
      });
      const { data } = response;
      if (data.mensaje == 'existente') {
        Alert.alert('El correo ya existe');
      } else if (data.usuarioRegistrado.correo == correo) {
        await AsyncStorage.setItem('usuario', JSON.stringify(data.usuarioRegistrado));
        props.navigation.navigate('Principal');
      }
    }
  };

  const [contra, setContra] = useState(true);

  const [isSelected, setSelection] = useState(false);

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

  const privacidad = async () => {
    await Linking.openURL('https://cocinas-aurora.herokuapp.com/privacidad');
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <SafeAreaView>
        <Block flex middle>
          <ImageBackground
            source={Images.RegistrarseBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          marginTop:
                            height >= 857 ? 80 : height >= 760 ? 70 : height >= 640 ? 60 : 60,
                        }}
                        color="#fff"
                        size={40}
                      >
                        Registrate
                      </Text>
                    </Block>
                  </Block>
                  <Block flex={1} space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={styles.containerInput}>
                            <Input
                              placeholder="Nombre(s)"
                              inputContainerStyle={{ borderBottomWidth: 0 }}
                              onChangeText={(nom) => {
                                handleChangeText(nom, 'nombres');
                                setNombresVacio(false);
                                setNombresLength(false);
                                setFormatoNombres(false);
                              }}
                              leftIcon={
                                <Icon5 size={16} name="user-edit" style={styles.inputIcons} />
                              }
                              errorMessage={
                                nombresVacio
                                  ? 'El nombre no puede estar vacio'
                                  : nombresLength
                                  ? 'El nombre es demasiado corto'
                                  : formatoNombres
                                  ? 'El nombre no es valido'
                                  : ''
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.containerInput}>
                            <Input
                              placeholder="Apellido(s)"
                              inputContainerStyle={{ borderBottomWidth: 0 }}
                              onChangeText={(ape) => {
                                handleChangeText(ape, 'apellidos');
                                setApellidosVacio(false);
                                setApellidosLength(false);
                                setFormatoApellidos(false);
                              }}
                              leftIcon={
                                <IconM size={16} name="text-fields" style={styles.inputIcons} />
                              }
                              errorMessage={
                                apellidosVacio
                                  ? 'El apellido no puede estar vacio'
                                  : apellidosLength
                                  ? 'El apellido es demasiado corto'
                                  : formatoApellidos
                                  ? 'El apellido no es valido'
                                  : ''
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.containerInput}>
                            <Input
                              placeholder="Correo Electrónico"
                              inputContainerStyle={{ borderBottomWidth: 0 }}
                              autoCapitalize="none"
                              keyboardType="email-address"
                              onChangeText={(email) => {
                                handleChangeText(email, 'correo');
                                setFormatoEmail(false);
                                setEmailVacio(false);
                              }}
                              leftIcon={<Icon size={16} name="email" style={styles.inputIcons} />}
                              errorMessage={
                                emailVacio
                                  ? 'El email no puede estar vacío'
                                  : formatoEmail
                                  ? 'El email no es válido'
                                  : ''
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.containerInput}>
                            <Input
                              placeholder="Contraseña"
                              secureTextEntry={contra ? true : false}
                              inputContainerStyle={{ borderBottomWidth: 0 }}
                              onChangeText={(pass) => {
                                handleChangeText(pass, 'password');
                                setPasswordVacia(false);
                                setPasswordLength(false);
                              }}
                              leftIcon={<IconF size={16} name="lock" style={styles.inputIconsP} />}
                              rightIcon={
                                <TouchableOpacity onPress={() => setContra(!contra)}>
                                  <IconI
                                    size={18}
                                    name={contra ? 'eye-outline' : 'ios-eye-off-outline'}
                                    style={styles.inputIconsPR}
                                  />
                                </TouchableOpacity>
                              }
                              errorMessage={
                                passwordVacia
                                  ? 'La contraseña no puede estar vacía'
                                  : passwordLength
                                  ? 'La contraseña debe de ser mayor a 8 carácteres'
                                  : ''
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.checkboxContainer}>
                            <CheckBox
                              value={isSelected}
                              onValueChange={setSelection}
                              tintColors={{ true: '#F15927', false: 'black' }}
                              style={styles.checkbox}
                            />
                            <Text style={styles.labelcheckbox}>Acepto los terminos de</Text>
                            <Text style={styles.labelcheckboxPriv} onPress={() => privacidad()}>
                              privacidad.
                            </Text>
                          </Block>
                        </Block>
                        <Block center>
                          <Button
                            color={nowTheme.COLORS.PRIMARY}
                            onPress={() => {
                              isSelected
                                ? registrarse()
                                : Alert.alert('Debe de aceptar los terminos de privacidad');
                            }}
                            round
                            style={styles.createButton}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={17}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Registrarse
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </SafeAreaView>
    </ScrollView>
  );
};

// Válidamos un corrreo valido
function validarCorreo(valor) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)) {
    return false;
  }

  return true;
}

// Válidamos solo letras
function validarSoloLetras(valor) {
  if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/.test(valor)) {
    return false;
  }
  return true;
}

const styles = StyleSheet.create({
  //notificaciones
  labelNoti: {
    color: '#fff',
    marginLeft: 6,
    marginBottom: 8,
  },
  qty: {
    height: width * 0.1,
    backgroundColor: nowTheme.COLORS.WHITE,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  labelcheckbox: {
    color: '#fff',
    margin: 8,
  },
  labelcheckboxPriv: {
    textDecorationLine: 'underline',
    color: '#ef800d',
    alignSelf: 'center',
  },
  //fondo
  imageBackgroundContainer: {
    width: width,
    height: height <= 670 ? height * 1.1 : height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height <= 700 ? height * 1.1 : height,
  },
  //contenedor
  registerContainer: {
    width: width * 0.9,
    height: height * 1.15,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },

  inputIcons: {
    marginRight: 11.5,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputIconsP: {
    marginRight: 17,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputIconsPR: {
    color: nowTheme.COLORS.ICON_INPUT,
  },
  containerInput: {
    borderRadius: 10,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: '#FFFFFF',
    marginBottom: 40,
    height: 48,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
  createButton: {
    marginTop: height >= 857 ? -150 : height >= 760 ? -100 : 0,
    width: width * 0.5,
    borderRadius: 10,
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

export default Registrarse;
