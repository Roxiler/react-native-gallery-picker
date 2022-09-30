import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
const GalleryHeader = (props: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.closeButton} onPress={props.onClosePress}>
        <Icon color="black" name="close" size={22} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={props.onSelectedAlbumPress}>
          <Text style={styles.title}>
            {!!props.selectedAlbum ? props.selectedAlbum : `Gallery`}
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
            onPress={props.onDonePress}>
            <Text style={styles.title}> Done</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={props.launchAppCamera}>
            <Icon color="black" name="camera-alt" size={30} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GalleryHeader;
