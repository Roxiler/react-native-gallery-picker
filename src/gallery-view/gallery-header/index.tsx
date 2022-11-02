import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
const GalleryHeader = (props: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.closeButton} onPress={props.onClosePress}>
        <Icon color="black" name="close" size={22} />
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={props.onSelectedAlbumPress}
        >
          <Text style={styles.title}>
            {props.selectedAlbum ? props.selectedAlbum : `Gallery`}
          </Text>
          <Icon
            name={
              !props.isAlbumListVisible
                ? 'keyboard-arrow-down'
                : 'keyboard-arrow-up'
            }
            size={20}
            color="black"
          />
        </TouchableOpacity>
        {props.showDoneButton ? (
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={props.onDonePress}
          >
            <Text style={styles.title}> Done</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default GalleryHeader;
