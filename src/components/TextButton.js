import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY } from '../colors';

const TextButton = ({ styles, title, onPress, hitSlop }) => {
  return (
    <Pressable
      style={styles?.button}
      hitSlop={hitSlop ? hitSlop : 10}
      onPress={onPress}
    >
      <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
    </Pressable>
  );
};

TextButton.propTypes = {
  //PropTypes
  styles: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func,
  hitSlop: PropTypes.number,
};

const defaultStyles = StyleSheet.create({
  title: {
    color: PRIMARY.DEFAULT,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default TextButton;
