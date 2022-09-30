// main index.js

import { AppRegistry, NativeModules } from 'react-native';
import CustomGallary from './src/gallery-view';

const { ReactNativeGalleryPicker } = NativeModules;

AppRegistry.registerComponent('CustomGallary', () => CustomGallary);
