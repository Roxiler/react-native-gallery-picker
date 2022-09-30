import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const guidelineBaseWidth = 360;
const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const styles = StyleSheet.create({
  title: {
    color: 'black',
    marginLeft: scale(16),
    alignSelf:'center'
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
});
