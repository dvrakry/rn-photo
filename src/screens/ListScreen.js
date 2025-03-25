import { StyleSheet, View } from 'react-native';
import { WHITE } from '../colors';
import PostList from '../components/PostList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ListScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <PostList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 30,
  },
});

export default ListScreen;
