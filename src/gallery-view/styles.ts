import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const guidelineBaseWidth = 360;
const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'black',
  },
  checkedIcon: {
    position: 'absolute',
    // top: scale(9),
    right: scale(7),
    bottom:9,
    zIndex: 9999,
    backgroundColor:'white',
    borderRadius:scale(10)
  },
  playIcon: {
    position: 'absolute',
    alignSelf:'center',
    zIndex: 9999,
    borderRadius:scale(20),
    top:scale(40),
    backgroundColor:'black'
    
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
});
