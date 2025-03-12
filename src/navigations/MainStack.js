import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainRoutes } from './routes';
import { WHITE } from '../colors';
import ContentTab from './ContentTap';
import SelectPhotosScreen from '../screens/SelectPhotosScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerShown: false,
      }}
    >
      <Stack.Screen name={MainRoutes.CONTETN_TAB} component={ContentTab} />
      <Stack.Screen
        name={MainRoutes.SELECT_PHOTOS}
        component={SelectPhotosScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
