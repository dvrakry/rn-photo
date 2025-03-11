import {
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Input, { InputTypes, returnKeyTypes } from '../components/Input';
import { useReducer, useRef } from 'react';
import Button from '../components/Button';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextButton from '../components/TextButton';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../navigations/routes';
import HR from '../components/HR';
import { WHITE } from '../colors';
import {
  authFormReducer,
  AuthFormTypes,
  initAuthForm,
} from '../reducers/authFormReducer';

const SignUpScreen = () => {
  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  const { top, bottom } = useSafeAreaInsets();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { navigate } = useNavigation();

  const updateForm = (payload) => {
    const newForm = { ...form, ...payload };
    const disabled =
      !newForm.email ||
      !newForm.password ||
      newForm.password !== newForm.passwordConfirm;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      //login완료
      console.log(form.email, form.password);
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
    }
  };

  return (
    <SafeInputView>
      <StatusBar style={'light'} />
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={StyleSheet.absoluteFillObject}>
          <Image
            source={require('../../assets/cover.png')}
            style={{ width: '100%' }}
            resizeMode={'cover'}
          />
        </View>
        <ScrollView
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
          contentContainerStyle={{ alignItems: 'center' }}
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <Input
            inputType={InputTypes.EMAIL}
            value={form.email}
            onChangeText={(text) => updateForm({ email: text.trim() })}
            onSubmitEditing={() => passwordRef.current.focus()}
            styles={{ container: { marginBottom: 20 } }}
            returnKeyType={returnKeyTypes.NEXT}
          />
          <Input
            ref={passwordRef}
            inputType={InputTypes.PASSWORD}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            styles={{ container: { marginBottom: 20 } }}
            returnKeyType={returnKeyTypes.NEXT}
          />
          <Input
            ref={passwordConfirmRef}
            inputType={InputTypes.PASSWORD_CONFIRM}
            value={form.passwordConfirm}
            onChangeText={(text) =>
              updateForm({ passwordConfirm: text.trim() })
            }
            onSubmitEditing={onSubmit}
            styles={{ container: { marginBottom: 20 } }}
            returnKeyType={returnKeyTypes.DONE}
          />
          <Button
            title={'SIGNUP'}
            disabled={form.disabled}
            isLoading={form.isLoading}
            onPress={onSubmit}
            styles={{ container: { marginTop: 20 } }}
          />
          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }} />
          <TextButton
            title={'SIGNIN'}
            onPress={() => navigate(AuthRoutes.SIGN_IN)}
          />
        </ScrollView>
      </View>
    </SafeInputView>
  );
};

// const inputStyles = StyleSheet.create({
//   container: { paddingHorizontal: 20, marginBottom: 20 },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 30,
  },
  form: {
    backgroundColor: WHITE,
    flexGrow: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SignUpScreen;
