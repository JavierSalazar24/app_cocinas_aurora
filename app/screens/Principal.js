import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants';
export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex>
          <ImageBackground
            source={Images.Principal}
            style={{ flex: 1, height, width, zIndex: 1 }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image
                  source={Images.Corazon}
                  style={{
                    position: 'absolute',
                    width: width >= 480 ? 150 : 115,
                    height: width >= 480 ? 160 : 124,
                    bottom:
                      width >= 480 ? height * 0.35 : height >= 760 ? height * 0.25 : height * 0.29,
                  }}
                />
              </Block>
              <Block>
                <Block middle>
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: width >= 480 ? 140 : 90,
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    color="white"
                    size={47}
                  >
                    Cocinas
                  </Text>
                </Block>
                <Block middle>
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: width >= 480 ? 70 : 40,
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    color="white"
                    size={47}
                  >
                    Aurora
                  </Text>
                </Block>
              </Block>
              <Block middle row>
                <Text
                  color="white"
                  size={16}
                  style={{
                    fontFamily: 'montserrat-regular',
                    position: 'absolute',
                    bottom: 5,
                    fontWeight: 'bold',
                  }}
                >
                  Comida con amor
                </Text>
              </Block>
              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 3.5,
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate('App')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 17 }}
                    color={theme.COLORS.WHITE}
                  >
                    VER MÁS...
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});
