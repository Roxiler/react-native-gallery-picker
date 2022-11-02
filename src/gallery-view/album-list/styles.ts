import { StyleSheet } from 'react-native';
import { scale } from '../../utils/common';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  listStyle: { paddingLeft: scale(15) },
  textContainer: { marginTop: scale(15) },
  text: { color: 'white', fontSize: scale(20) },
});
