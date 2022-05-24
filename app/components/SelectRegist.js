import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import { Block, Text } from 'galio-framework';

import Icon from 'react-native-vector-icons/FontAwesome';
import { nowTheme } from '../constants';

class DropDown extends React.Component {
  state = {
    value: 'aceptadas',
  };

  handleOnSelect = (index, value) => {
    const { onSelect } = this.props;

    this.setState({ value: value });
    onSelect && onSelect(index, value);
  };

  render() {
    const { onSelect, iconName, iconFamily, iconSize, iconColor, textStyle, ...props } = this.props;

    const textStyles = [styles.text, textStyle];

    return (
      <ModalDropdown
        onSelect={this.handleOnSelect}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={{ paddingLeft: 20, fontSize: 13.5 }}
        {...props}
      >
        <Block flex row middle space="between">
          <Text size={13.5} style={(textStyles, { paddingRight: 10 })}>
            {this.state.value}
          </Text>
          <Icon
            name={'angle-down'}
            size={iconSize || 20}
            color={iconColor || nowTheme.COLORS.BLACK}
          />
        </Block>
      </ModalDropdown>
    );
  }
}

DropDown.propTypes = {
  onSelect: PropTypes.func,
  iconName: PropTypes.string,
  iconFamily: PropTypes.string,
  iconSize: PropTypes.number,
  color: PropTypes.string,
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  text: {
    color: nowTheme.COLORS.BLACK,
    fontWeight: '600',
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
    width: 125,
  },
});

export default DropDown;
