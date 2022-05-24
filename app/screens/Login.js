import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import Icon from 'react-native-vector-icons/Zocial';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Foundation';
import IconFon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import { Input } from 'react-native-elements';
import { Images, nowTheme } from '../constants';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import axios from 'axios';

const baseUrl = 'https://cocinas-aurora-app.herokuapp.com/';
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const { width, height } = Dimensions.get('screen');
const Login = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isConnected();
    setLoading(false);
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
    correo: '',
    password: '',
  };

  const [state, setState] = useState(initalState);
  const [formatoEmail, setFormatoEmail] = useState(false);
  const [emailVacio, setEmailVacio] = useState(false);
  const [passwordVacia, setPasswordVacia] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const handleChangeText = (email, correo, pass, password) => {
    setState({ ...state, [correo]: email, [password]: pass });
  };

  const login = async () => {
    const correo = state.correo.trim();
    let password = state.password.trim();

    const validarEmail = validarCorreo(correo);
    if (correo == '' && password == '') {
      setEmailVacio(true);
      setPasswordVacia(true);
    }
    if (correo == '') {
      setEmailVacio(true);
    }
    if (password == '') {
      setPasswordVacia(true);
    }
    if (!validarEmail) {
      setFormatoEmail(true);
    }
    if (password.length < 8) {
      setPasswordLength(true);
    }

    if (correo.length > 0 && password.length > 0 && validarEmail && password.length >= 8) {
      password = md5(password);
      const response = await axios.post(baseUrl + 'login', {
        correo,
        password,
      });
      const { data } = response;
      if (data.usuario.length != 0) {
        await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario[0]));
        props.navigation.navigate('Principal');
      } else {
        Alert.alert('Correo o contraseña incorrectos');
      }
    }
  };

  const logInFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '1468105316885434',
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile, email'],
      });
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,first_name,last_name,picture.type(large),email&access_token=${token}`
        );
        const result = await response.json();
        const perfil = {
          correo: result.email,
          nombres: result.first_name,
          apellidos: result.last_name,
          foto: result.picture.data.url,
          redSocial: 'facebook',
        };
        AsyncStorage.setItem('usuario', JSON.stringify(perfil));
        props.navigation.navigate('Principal');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const loginGoogle = () => {
    const config = {
      iosStandaloneAppClientId:
        '598248843600-osarfqcgpgi0s9bejuhktq5g6fffp6op.apps.googleusercontent.com',
      androidStandaloneAppClientId:
        '598248843600-9vm3fqqc4lbiujsusdoiuss0r7kjfl0s.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == 'success') {
          const perfil = {
            correo: user.email,
            nombres: user.givenName,
            apellidos: user.familyName,
            foto: user.photoUrl,
            redSocial: 'google',
          };
          AsyncStorage.setItem('usuario', JSON.stringify(perfil));
          props.navigation.navigate('Principal');
        } else {
          Alert.alert('Canceló el inicio de sesión');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [contra, setContra] = useState(true);

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
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <SafeAreaView>
        <Block flex middle>
          <ImageBackground
            source={Images.Login}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginTop:
                          height >= 857 ? 34 : height >= 760 ? 50 : height >= 640 ? 15 : 15,
                      }}
                      color="#865439"
                      size={28}
                    >
                      Iniciar Sesión
                    </Text>
                  </Block>
                  <Block flex={1} space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block style={{ marginTop: height == 640 ? 40 : 65 }}>
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
                                    size={20}
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
                        </Block>
                        <Block center>
                          <Button
                            color={nowTheme.COLORS.PRIMARY}
                            onPress={() => login()}
                            round
                            style={styles.createButton}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={17}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Iniciar sesión
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <TouchableOpacity onPress={() => logInFacebook()}>
                      <Block style={styles.iconoContainerFace}>
                        <IconFon color="#FFFFFF" size={30} name="facebook" />
                      </Block>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => loginGoogle()}>
                      <Block style={styles.iconoContainerGoogle}>
                        <IconFon color="#FFFFFF" size={30} name="google" />
                      </Block>
                    </TouchableOpacity>
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

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
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
    width: width * 0.5,
    marginBottom: 20,
    borderRadius: 10,
  },
  socialConnect: {
    marginBottom: -20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconoContainerFace: {
    width: 50,
    height: 50,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#3b5998',
    alignSelf: 'center',
  },
  iconoContainerGoogle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#d1392e',
    alignSelf: 'center',
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

export default Login;
