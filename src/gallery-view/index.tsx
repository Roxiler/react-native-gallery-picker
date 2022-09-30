import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraRoll from '@react-native-community/cameraroll';
import {
  Modal,
  FlatList,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import {styles} from './styles';
import {CheckIcon, CloseIcon} from './images';
import GalleryHeader from './gallery-header';
import {useGalleryView} from './hooks';
import AlbumList from './album-list';

interface CustomGallaryProps {
  visible: boolean;
  type: string;
  selectionLimit: number;
  onClose: () => void;
  onCameraPress: () => void;
  onSelectImages: (media: any[]) => void;
}

const CustomGallary = (props: CustomGallaryProps) => {
  const {
    visible,
    onClose,
    images,
    numOfColums,
    isRefresh,
    window,
    albums,
    onCameraPress,
    isAlbumListVisible,
    selectedAlbum,
    isDisabled,
    openGalleryModal,
    showDoneButton,
    onSelectImages,
    handleOpenGallery,
    onDonePress,
    onSelectImage,
    launchAppCamera,
    onAlbumPress,
    selectAlbum,
    handleClosePress,
  } = useGalleryView(props);
  return (
    <TouchableOpacity onPress={handleOpenGallery} disabled={isDisabled}>
      {props.children}
      <Modal
        animationType="fade"
        transparent
        visible={openGalleryModal}
        enableDismisOnTouchOutside
        onRequestClose={onClose}
        style={{justifyContent: 'flex-end'}}>
        <SafeAreaView style={styles.root}>
          <GalleryHeader
            onSelectedAlbumPress={onAlbumPress}
            selectedAlbum={selectedAlbum}
            isAlbumListVisible={isAlbumListVisible}
            onClosePress={handleClosePress}
            onDonePress={onDonePress}
            showDoneButton = {showDoneButton}
            launchAppCamera={launchAppCamera}
          />
          {isAlbumListVisible ? (
            <AlbumList data={albums} onAlbumNamePress={selectAlbum} />
          ) : (
            <FlatList
              style={{flex: 1}}
              data={images}
              numColumns={numOfColums}
              extraData={isRefresh}
              keyExtractor={(item: any, index: number) =>
                `custom_gallary_item_${index}`
              }
              renderItem={({item, index}) => {
                const {node: {image = {}} = {}, selected = false} = item;
                const {uri = '', playableDuration = 0}: any = image || {};

                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      {
                        width: window.width / numOfColums,
                        height: window.width / numOfColums,
                        borderWidth: 2,
                     
                      },
                    ]}
                    onPress={() => onSelectImage(index)}>
                    {!!selected && (
                      <Icon
                        color="black"
                        style={styles.checkedIcon}
                        name="check-circle"
                        size={20}
                      />
                    )}
                    {playableDuration && (
                      <View style={styles.playIcon}>
                        <Icon color="white" name="play-arrow" size={40} />
                      </View>
                    )}
                    <Image
                      style={{
                        width: '100%',
                        height: `100%`,
                      }}
                      source={{uri: uri}}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </SafeAreaView>
      </Modal>
    </TouchableOpacity>
  );
};

export default CustomGallary;
