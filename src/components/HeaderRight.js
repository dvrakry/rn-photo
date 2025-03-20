import { Pressable } from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GRAY, PRIMARY } from '../colors';

const HeaderRight = ({ onPress, disabled = false }) => {
  return (
    <Pressable onPressOut={onPress} disabled={disabled} hitSlop={10}>
      <MaterialCommunityIcons
        name="check"
        size={24}
        color={disabled ? GRAY.DEFAULT : PRIMARY.DEFAULT}
      />
    </Pressable>
  );
};

HeaderRight.propTypes = {
  //PropTypes
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default HeaderRight;
