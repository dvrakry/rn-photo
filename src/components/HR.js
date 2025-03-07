import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, WHITE } from '../colors';

const HR = ({ styles, text }) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <View style={[defaultStyles.line, styles?.line]}></View>
      {!!text && <Text style={[defaultStyles.text, styles?.text]}>{text}</Text>}
    </View>
  );
};

HR.propTypes = {
  //PropTypes
  styles: PropTypes.object,
  text: PropTypes.string,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    color: GRAY.DARK,
  },
  line: {
    ...StyleSheet.absoluteFillObject,
    height: '50%',
    borderBottomWidth: 1,
    borderBottomColor: GRAY.DARK,
  },
});

export default HR;
