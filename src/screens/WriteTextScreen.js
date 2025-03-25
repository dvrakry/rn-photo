import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import HeaderRight from '../components/HeaderRight';
import FastImage from '../components/FastImage';
import { GRAY } from '../colors';

import 'react-native-get-random-values';
import LocationSearch from '../components/LocationSearch';
import { uploadPhoto } from '../api/storage';
import { Alert } from 'react-native';
import { createPost } from '../api/post';
import event, { EventType } from '../event';
//import { v4 as uuid } from 'uuid';

const MAX_TEXT_LENGTH = 60;

const WriteTextScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const width = useWindowDimensions().width / 4;

  const [photoUris, setPhotoUris] = useState([]);
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(isLoading || !text);
  }, [text, isLoading]);

  useEffect(() => {
    setPhotoUris(params?.photoUris ?? []);
  }, [params?.photoUris]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    try {
      const photos = await Promise.all(
        photoUris.map((uri) => uploadPhoto(uri))
      );
      await createPost({ photos, location, text });
      //Event -> REFRESH
      event.emit(EventType.REFRESH);

      navigation.goBack();
    } catch (e) {
      Alert.alert('글 작성 실패', e.message, [
        {
          text: '확인',
          onPress: () => setIsLoading(false),
        },
      ]);
    }
  }, [photoUris, location, text, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight disabled={disabled} onPress={onSubmit} />,
    });
  }, [onSubmit, disabled, navigation]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        {photoUris.map((uri, idx) => (
          <FastImage
            key={idx}
            source={{ uri }}
            style={{ width, height: width }}
          />
        ))}
      </View>

      <LocationSearch
        onPress={({ description }) => setLocation(description)}
        isLoading={isLoading}
        isSelected={!!location}
      />

      <View>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={styles.input}
          placeholder={'사진의 설명을 작성하세요.'}
          maxLength={MAX_TEXT_LENGTH}
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          textContentType={'none'}
          keyboardAppearance={'light'}
          multiline={true}
          blurOnSubmit={true}
          editable={!isLoading}
        />
        <Text style={styles.inputLength}>
          {text.length} / {MAX_TEXT_LENGTH}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  inputLength: {
    color: GRAY.DARK,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    fontSize: 12,
  },
});

export default WriteTextScreen;
