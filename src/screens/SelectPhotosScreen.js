import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';

const SelectPhotosScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SelectPhotosScreen</Text>
      <Button
        title={'tab'}
        onPress={() => navigation.navigate(MainRoutes.CONTETN_TAB)}
      />
    </View>
  );
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

export default SelectPhotosScreen;
