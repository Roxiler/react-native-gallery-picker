import { Dimensions, PermissionsAndroid, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 360;
export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const checkAppPermission = (message: string, permission: any) => {
  const isAndroid = Platform.OS === 'android';
  return new Promise((resolve) => {
    const requestPermission = async () => {
      if (isAndroid) {
        const rationale = message
          ? {
              title: 'Permission Required',
              message: message,
              buttonPositive: 'OK',
            }
          : undefined;
        await PermissionsAndroid.request(permission, rationale)
          .then((status) => {
            if (status === PermissionsAndroid.RESULTS.GRANTED) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            resolve(false);
            console.log(error);
          });
      } else {
        resolve(true); // ios
      }
    };
    requestPermission();
  });
};
