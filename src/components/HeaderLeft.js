import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BLACK } from '../colors';

const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      hitSlop={10}
      onPressOut={() => navigation.canGoBack() && navigation.goBack()}
    >
      <MaterialCommunityIcons name="chevron-left" size={28} color={BLACK} />
    </Pressable>
  );
};

export default HeaderLeft;
