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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_KEY } from '../../env';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import 'react-native-get-random-values';
//import { v4 as uuid } from 'uuid';

const MAX_TEXT_LENGTH = 60;

const WriteTextScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const width = useWindowDimensions().width / 4;

  const [photoUris, setPhotoUris] = useState([]);
  const [text, setText] = useState('');

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(isLoading || !text);
  }, [text, isLoading]);

  useEffect(() => {
    setPhotoUris(params?.photoUris ?? []);
  }, [params?.photoUris]);

  const onSubmit = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

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

      <View style={styles.location}>
        <GooglePlacesAutocomplete
          placeholder={'Location'}
          query={{ key: MAP_KEY, language: 'ko' }}
          onPress={(data) => console.log('data', data)}
          onFail={(e) => {
            console.log('GooglePlacesAutocomplete Fail : ', e);
          }}
          styles={{ container: { flex: 0 }, textInput: { paddingLeft: 30 } }}
        />
        <View style={styles.locationIcon}>
          <MaterialCommunityIcons
            name="map-marker"
            size={20}
            color={GRAY.DARK}
          />
        </View>
      </View>

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
  locationIcon: {
    position: 'absolute',
    left: 20,
    top: 16,
  },
  location: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.LIGHT,
  },
});

export default WriteTextScreen;
