import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'SignIn'} component={SignInScreen} />
      <Stack.Screen name={'SignUp'} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
