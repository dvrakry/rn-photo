import { FlatList, StyleSheet, View } from 'react-native';
import PostItem from './PostItem';
import { GRAY } from '../colors';
import usePosts from '../hooks/usePosts';
import { useEffect } from 'react';
import event, { EventType } from '../event';
import PropTypes from 'prop-types';

const PostList = ({ isMine = false }) => {
  const { data, refetching, fetchNextPage, refetch } = usePosts(isMine);

  useEffect(() => {
    event.addListener(EventType.REFRESH, refetch);

    return () => event.removeAllListeners();
  }, [refetch]);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PostItem post={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.4}
      onRefresh={refetch}
      refreshing={refetching}
    />
  );
};

PostList.propTypes = {
  isMine: PropTypes.bool,
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.LIGHT,
  },
});

export default PostList;
