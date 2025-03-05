import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignInScreen</Text>
      <Button title="signup" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

SignInScreen.propTypes = {
  //PropTypes
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default SignInScreen;
