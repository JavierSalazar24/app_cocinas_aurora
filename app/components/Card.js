import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native-elements';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: 'no data',
    };

    AsyncStorage.getItem('darkmode').then((result) => {
      const data = result == 'true' ? true : false;
      this.setState({
        data,
      });
    });
  }

  UNSAFE_componentWillMount() {
    this.listener = EventRegister.addEventListener('changeThemeEvent', (data) => {
      this.setState({
        data,
      });
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <Block flex style={imgContainer}>
          <Image
            PlaceholderContent={<ActivityIndicator size="large" color="#2C394B" />}
            resizeMode="cover"
            source={
              typeof item.image == 'number'
                ? item.image
                : {
                    uri: item.image,
                  }
            }
            style={imageStyles}
          />
        </Block>
        <Block
          flex
          space="between"
          style={
            this.state.data == true
              ? { backgroundColor: '#474747', padding: theme.SIZES.BASE / 2 }
              : { backgroundColor: '#fff', padding: theme.SIZES.BASE / 2 }
          }
        >
          <Block flex>
            {item.title ? (
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={16}
                style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}
                color={this.state.data == true ? nowTheme.COLORS.WHITE : nowTheme.COLORS.SECONDARY}
              >
                {item.title}
              </Text>
            ) : (
              <Block />
            )}
            {item.subtitle ? (
              <Block flex center>
                <Text
                  style={{
                    fontFamily: 'montserrat-regular',
                    marginHorizontal: 10,
                    marginBottom: 10,
                  }}
                  size={26}
                  color={this.state.data == true ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK}
                >
                  {item.subtitle}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
            {item.description ? (
              <Block flex center>
                <Text
                  style={{ fontFamily: 'montserrat-regular', textAlign: 'center', marginTop: -10 }}
                  size={16}
                  color={this.state.data == true ? '#b4b4b4' : '#9A9A9A'}
                >
                  {item.description}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
            {item.body ? (
              <Block flex left>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={12}
                  color={nowTheme.COLORS.TEXT}
                >
                  {item.body}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
            {item.title2 ? (
              <Block flex center>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={16}
                  style={{ marginTop: 20, marginBottom: 5 }}
                  color={this.state.data == true ? '#4bd14b' : '#40a340'}
                >
                  {'\u2022'} {item.title2}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
            {item.title3 ? (
              <Block flex center>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={16}
                  style={{ marginBottom: 5 }}
                  color={this.state.data == true ? '#4bd14b' : '#40a340'}
                >
                  {'\u2022'} {item.title3}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
            {item.title4 ? (
              <Block flex center>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={16}
                  style={{ marginBottom: 5 }}
                  color={this.state.data == true ? '#4bd14b' : '#40a340'}
                >
                  {'\u2022'} {item.title4}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
          </Block>
          <Block right={ctaRight ? true : false}>
            <Text
              style={styles.articleButton}
              size={12}
              muted={!ctaColor}
              color={ctaColor || nowTheme.COLORS.ACTIVE}
              bold
            >
              {item.cta}
            </Text>
          </Block>
        </Block>
        {/* </TouchableWithoutFeedback> */}
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  titleStyles: {
    color: '#000',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
});

export default withNavigation(Card);
