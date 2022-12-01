import { Dimensions, StyleSheet } from 'react-native';
import { scale } from '../utils/common';
const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1 },
  root: {
    height: '100%',
    backgroundColor: 'black',
  },
  checkedIcon: {
    position: 'absolute',
    right: scale(7),
    bottom: 9,
    zIndex: 9999,
    backgroundColor: 'white',
    borderRadius: scale(10),
  },
  playIcon: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 9999,
    borderRadius: scale(20),
    top: scale(40),
    backgroundColor: 'black',
  },
  title: {
    color: 'black',
    marginLeft: scale(16),
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(11),
    paddingVertical: scale(10),
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
  },
  modalStyle: { justifyContent: 'flex-end' },
  imageContainer: {
    width: '100%',
    height: `100%`,
  },
  imageBoxContainer: {
    width: window.width / 3,
    height: window.width / 3,
    borderWidth: 2,
  },
});
