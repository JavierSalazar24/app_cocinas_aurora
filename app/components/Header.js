import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Block, NavBar, theme } from 'galio-framework';
import IconF from 'react-native-vector-icons/FontAwesome';
import Tabs from './Tabs';
import nowTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderTabs = () => {
    const { tabs, tabIndex, navigation, bgTab } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        style={{ backgroundColor: bgTab }}
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => navigation.setParams({ tabId: id })}
      />
    );
  };

  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return <Block center>{tabs ? this.renderTabs() : null}</Block>;
    }
  };

  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;
    const noShadow = [
      'Inicio',
      'Porciones',
      'Contactanos',
      'FAQ',
      'Login',
      'Registrarse',
      'Perfil',
    ].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          left={
            <IconF
              name={'bars'}
              size={20}
              onPress={this.handleLeftPress}
              color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK)}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
});

export default withNavigation(Header);
