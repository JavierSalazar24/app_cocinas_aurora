import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Card } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Faq = (props) => {
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

  //Estados para la sección de los métodos de pago
  const [metodos1, setMetodos1] = useState(true);
  const [metodos2, setMetodos2] = useState(true);
  //Estados para la sección de pedidos
  const [pedidos1, setPedidos1] = useState(true);
  const [pedidos2, setPedidos2] = useState(true);
  const [pedidos3, setPedidos3] = useState(true);
  const [pedidos4, setPedidos4] = useState(true);
  //Estados para la sección de seguridad
  const [seguridad1, setSeguridad1] = useState(true);
  const [seguridad2, setSeguridad2] = useState(true);
  const [seguridad3, setSeguridad3] = useState(true);
  //Estados para la sección de higiene
  const [higiene1, setHigiene1] = useState(true);
  const [higiene2, setHigiene2] = useState(true);
  const [higiene3, setHigiene3] = useState(true);

  const llamar = async () => {
    await Linking.openURL('tel:6188127776');
  };

  const whatsapp = async () => {
    await Linking.openURL('https://wa.me/526188127776?text=Me%20interesa%20algo%20del%20men%C3%BA');
  };

  const privacidad = async () => {
    await Linking.openURL('https://cocinas-aurora.herokuapp.com/privacidad');
  };

  const certificadoSSL = async () => {
    await Linking.openURL(
      'https://www.websecurity.digicert.com/es/es/security-topics/what-is-ssl-tls-https'
    );
  };

  const certificadoNOM = async () => {
    await Linking.openURL('https://dof.gob.mx/nota_detalle.php?codigo=5286029&fecha=29/01/2013');
  };

  const estilosCard = () => {
    return !darkApp
      ? styles.card
      : [styles.card, { backgroundColor: '#474747', borderColor: '#474747' }];
  };

  //Cards para los métodos de pago
  const metodosPagar = () => {
    return (
      <View>
        {/* Tarjeta para la primera pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Que métodos de pago tienen?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {metodos1 ? (
              <TouchableOpacity
                onPress={() => {
                  setMetodos1(!metodos1);
                  setMetodos2(true);

                  setPedidos1(true);
                  setPedidos2(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Contamos con dos principales métodos de pago, los cuales son en efectivo y
                  cualquier tipo de tarjeta.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMetodos1(!metodos1);
                    setMetodos2(true);

                    setPedidos1(true);
                    setPedidos2(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        {/* Tarjeta para la segunda pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Qué tipo de moneda aceptan?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {metodos2 ? (
              <TouchableOpacity
                onPress={() => {
                  setMetodos2(!metodos2);
                  setMetodos1(true);

                  setPedidos1(true);
                  setPedidos2(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Por el momento solo aceptamos moneda nacional.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMetodos2(!metodos2);
                    setMetodos1(true);

                    setPedidos1(true);
                    setPedidos2(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  };

  const hacerPedidos = () => {
    return (
      <View>
        {/* Tarjeta para la primera pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Puedo realizar algún pedido?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {pedidos1 ? (
              <TouchableOpacity
                onPress={() => {
                  setPedidos1(!pedidos1);
                  setPedidos2(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Claro, lo puede realizar llamando a este número:{' '}
                  <Text onPress={() => llamar()} style={styles.link}>
                    618 812 77 76
                  </Text>{' '}
                  o vía:{' '}
                  <Text onPress={() => whatsapp()} style={styles.link}>
                    Whatsapp
                  </Text>
                  .
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPedidos1(!pedidos1);
                    setPedidos2(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        {/* Tarjeta para la segunda pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Tienen entregas a domicilio?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {pedidos2 ? (
              <TouchableOpacity
                onPress={() => {
                  setPedidos2(!pedidos2);
                  setPedidos1(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Así es, contamos con un servicio externo, al cual se le marca cuando se solicita
                  un servicio a domicilio.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPedidos2(!pedidos2);
                    setPedidos1(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        {/* Tarjeta para la tercera pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={{ fontWeight: 'bold', fontSize: 18 }}>
            ¿Cuánto tiempo tardan en entregar la comida?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {pedidos3 ? (
              <TouchableOpacity
                onPress={() => {
                  setPedidos3(!pedidos3);
                  setPedidos1(true);
                  setPedidos2(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Se tarda aproximadamente 25 a 30 minutos o dependiendo el clima del día.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPedidos3(!pedidos3);
                    setPedidos1(true);
                    setPedidos2(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        {/* Tarjeta para la cuarta pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Los envíos tiene costo extra?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {pedidos4 ? (
              <TouchableOpacity
                onPress={() => {
                  setPedidos4(!pedidos4);
                  setPedidos1(true);
                  setPedidos2(true);
                  setPedidos3(true);

                  setMetodos1(true);
                  setMetodos2(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Se hace una valoración de donde se encuentra el cliente y dependiendo de su
                  ubicación es el cobro del servicio.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPedidos4(!pedidos4);
                    setPedidos1(true);
                    setPedidos2(true);
                    setPedidos3(true);

                    setMetodos1(true);
                    setMetodos2(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  };

  const seguridadPersonal = () => {
    return (
      <View>
        {/* Tarjeta para la primera pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Cuentan con política de privacidad?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {seguridad1 ? (
              <TouchableOpacity
                onPress={() => {
                  setSeguridad1(!seguridad1);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setPedidos1(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Si, contamos con una política de privacidad sobre nuestro sitio web y aplicación
                  móvil que puedes ver desde{' '}
                  <Text style={styles.link} onPress={() => privacidad()}>
                    aquí.
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSeguridad1(!seguridad1);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setPedidos1(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        {/* Tarjeta para la segunda pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Como puedo saber si son confiables?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {seguridad2 ? (
              <TouchableOpacity
                onPress={() => {
                  setSeguridad2(!seguridad2);
                  setSeguridad1(true);
                  setSeguridad3(true);

                  setPedidos1(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Contamos con certificado web SSL, que Google nos certifica como sitio web
                  confiable y seguro para poder navegar en él. Puedes encontrar más información de
                  este certificado{' '}
                  <Text style={styles.link} onPress={() => certificadoSSL()}>
                    aquí.
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSeguridad2(!seguridad2);
                    setSeguridad1(true);
                    setSeguridad3(true);

                    setPedidos1(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        {/* Tarjeta para la tercera pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Qué pasa con mis datos personales?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {seguridad3 ? (
              <TouchableOpacity
                onPress={() => {
                  setSeguridad3(!seguridad3);
                  setSeguridad1(true);
                  setSeguridad2(true);

                  setPedidos1(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);

                  setHigiene1(true);
                  setHigiene2(true);
                  setHigiene3(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Tus datos personales son guardados y almacenados en nuestra Base de Datos para
                  poder estar en contacto contigo. Recuerda que contamos con certificado SSL y este
                  nos ayuda a que tu información viaje segura a nuestros servidores.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSeguridad3(!seguridad3);
                    setSeguridad1(true);
                    setSeguridad2(true);

                    setPedidos1(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);

                    setHigiene1(true);
                    setHigiene2(true);
                    setHigiene3(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  };

  const higieneComercial = () => {
    return (
      <View>
        {/* Tarjeta para la primera pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Cuentan con algún certificado de sanidad?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {higiene1 ? (
              <TouchableOpacity
                onPress={() => {
                  setHigiene1(!higiene1);
                  setHigiene2(true);
                  setHigiene3(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setPedidos1(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Si, contamos con el certificado NOM 256 SSA1 2012, la cual valida nuestros
                  productos con la norma de sanidad. Puedes encontrar más información de este
                  certificado{' '}
                  <Text style={styles.link} onPress={() => certificadoNOM()}>
                    aquí.
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setHigiene1(!higiene1);
                    setHigiene1(!higiene1);
                    setHigiene2(true);
                    setHigiene3(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setPedidos1(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        {/* Tarjeta para la segunda pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Cuáles son sus protocolos de sanidad?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {higiene2 ? (
              <TouchableOpacity
                onPress={() => {
                  setHigiene2(!higiene2);
                  setHigiene1(true);
                  setHigiene3(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setPedidos1(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text
                  style={
                    !darkApp
                      ? [styles.textCard, { paddingVertical: 3 }]
                      : [styles.textCard, { color: '#d8d8d8', paddingVertical: 3 }]
                  }
                >
                  * Uso de cubrebocas obligatorio para los clientes y personal.
                </Text>
                <Text
                  style={
                    !darkApp
                      ? [styles.textCard, { paddingVertical: 3 }]
                      : [styles.textCard, { color: '#d8d8d8', paddingVertical: 3 }]
                  }
                >
                  * Desinfectarse las manos.
                </Text>
                <Text
                  style={
                    !darkApp
                      ? [styles.textCard, { paddingVertical: 3 }]
                      : [styles.textCard, { color: '#d8d8d8', paddingVertical: 3 }]
                  }
                >
                  * Vínil para que los clientes no tengan contacto con la comida.
                </Text>
                <Text
                  style={
                    !darkApp
                      ? [styles.textCard, { paddingVertical: 3 }]
                      : [styles.textCard, { color: '#d8d8d8', paddingVertical: 3 }]
                  }
                >
                  * La persona que cobra no toca en ningún momento la comida.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setHigiene2(!higiene2);
                    setHigiene1(true);
                    setHigiene3(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setPedidos1(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
        {/* Tarjeta para la tercera pregunta */}
        <Card containerStyle={estilosCard()}>
          <Card.Title style={!darkApp ? styles.titleCard : [styles.titleCard, { color: '#FFF' }]}>
            ¿Su personal es limpio en su área de trabajo?
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            {higiene3 ? (
              <TouchableOpacity
                onPress={() => {
                  setHigiene3(!higiene3);
                  setHigiene1(true);
                  setHigiene2(true);

                  setSeguridad1(true);
                  setSeguridad2(true);
                  setSeguridad3(true);

                  setPedidos1(true);
                  setPedidos3(true);
                  setPedidos4(true);

                  setMetodos1(true);
                  setMetodos2(true);
                }}
              >
                <Text
                  style={
                    !darkApp
                      ? { color: '#000', fontSize: 15, textAlign: 'center' }
                      : { color: '#FFF', fontSize: 15, textAlign: 'center' }
                  }
                >
                  Ver más...
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={!darkApp ? styles.textCard : [styles.textCard, { color: '#d8d8d8' }]}>
                  Cada uno tiene su área de trabajo y cada cierto tiempo la limpian y desinfectan.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setHigiene3(!higiene3);
                    setHigiene1(true);
                    setHigiene2(true);

                    setSeguridad1(true);
                    setSeguridad2(true);
                    setSeguridad3(true);

                    setPedidos1(true);
                    setPedidos3(true);
                    setPedidos4(true);

                    setMetodos1(true);
                    setMetodos2(true);
                  }}
                >
                  <Text style={!darkApp ? styles.verMenos : [styles.verMenos, { color: '#FFF' }]}>
                    Ver menos
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ marginBottom: 40 }}>
          <StatusBar hidden />
          <View>
            {typeof props.route.params != 'undefined' ? (
              props.route.params.tabId == 'Métodos de pago' ? (
                metodosPagar()
              ) : props.route.params.tabId == 'Pedidos' ? (
                hacerPedidos()
              ) : props.route.params.tabId == 'Seguridad' ? (
                seguridadPersonal()
              ) : props.route.params.tabId == 'Higiene' ? (
                higieneComercial()
              ) : (
                <Text>No se encontraron preguntas</Text>
              )
            ) : (
              metodosPagar()
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  titleCard: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageCard: {
    width: 180,
    height: 180,
  },
  textCard: {
    paddingHorizontal: 5,
    fontSize: 15,
    textAlign: 'justify',
  },
  verMas: {
    fontSize: 15,
    textAlign: 'center',
  },
  verMenos: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
    color: '#ef800d',
  },
});

export default Faq;
