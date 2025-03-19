import { Alert, FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import PhotoItem from './PhotoItem';

export const getLocalUri = async (id) => {
  return (await MediaLibrary.getAssetInfoAsync(id)).localUri;
};

const initListInfo = {
  endCursor: '',
  hasNextPage: true,
};

const ImagePicker = ({ togglePhoto, isSelectedPhoto }) => {
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const [photos, setPhotos] = useState([]);
  const listInfo = useRef(initListInfo);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('사진 접근 권한', '사진 접근 권한이 필요합니다.', [
          {
            text: '확인',
            onPress: () => navigation.canGoBack() && navigation.goBack(),
          },
        ]);
      }
    })();
  }, [navigation, requestPermission]);

  const getPhotos = useCallback(async () => {
    const options = {
      first: 30,
      sortBy: [MediaLibrary.SortBy.creationTime],
    };

    if (listInfo.current.endCursor) {
      options['after'] = listInfo.current.endCursor;
    }

    if (listInfo.current.hasNextPage) {
      const { assets, endCursor, hasNextPage } =
        await MediaLibrary.getAssetsAsync(options);

      //IOS 사진 불러오기 안되서 수정한 부분
      const processedAssets = await Promise.all(
        assets.map(async (asset) => {
          if (asset.uri.startsWith('ph://')) {
            const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
            return {
              ...asset,
              uri: assetInfo.localUri || asset.uri,
            };
          }
          return asset;
        })
      );

      setPhotos((prev) =>
        options.after ? [...prev, ...processedAssets] : processedAssets
      );
      listInfo.current = { endCursor, hasNextPage };
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    listInfo.current = initListInfo;
    await getPhotos();
    setRefreshing(false);
  };

  useEffect(() => {
    if (status?.granted) {
      getPhotos();
    }
  }, [status?.granted, getPhotos]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={photos}
        renderItem={({ item }) => (
          <PhotoItem
            item={item}
            togglePhoto={togglePhoto}
            isSelected={isSelectedPhoto(item)}
          />
        )}
        numColumns={3}
        onEndReached={getPhotos}
        onEndReachedThreshold={0.3}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

ImagePicker.propTypes = {
  isSelectedPhoto: PropTypes.func,
  togglePhoto: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
});

export default ImagePicker;
