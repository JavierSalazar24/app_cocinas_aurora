import React from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import nowTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'Inicio':
        return (
          <Icon5
            name="home"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Porciones':
        return (
          <IconMI
            name="food-bank"
            size={25}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ marginLeft: -2, opacity: 0.5 }}
          />
        );
      case 'Contactanos':
        return (
          <IconMI
            name="contact-phone"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'FAQ':
        return (
          <Icon5
            name="question-circle"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Visitanos':
        return (
          <Icon5
            name="map-signs"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Perfil':
        return (
          <Icon5
            name="id-card-alt"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Login':
        return (
          <Icon
            name="sign-in"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Registrarse':
        return (
          <IconM
            name="notebook"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'SITIO WEB':
        return (
          <Icon
            name="globe"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
          />
        );
      case 'CERRAR SESIÓN':
        return (
          <Icon5
            name="door-open"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
          />
        );
      default:
        return (
          <Icon5
            name="fire-extinguisher"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          title == 'SITIO WEB'
            ? Linking.openURL('https://cocinas-aurora.herokuapp.com/').catch((err) =>
                console.error('An error occurred', err)
              )
            : navigation.navigate(
                title == 'CERRAR SESIÓN' ? (AsyncStorage.removeItem('usuario'), 'Principal') : title
              )
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: 'montserrat-regular',
                textTransform: 'uppercase',
                fontWeight: '300',
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white',
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
