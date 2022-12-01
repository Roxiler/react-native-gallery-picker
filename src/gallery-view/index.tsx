import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AlbumList from './album-list';
import GalleryHeader from './gallery-header';
import { useGalleryView } from './hooks';
import { styles } from './styles';

interface CustomGalleryProps {
  type: string;
  selectionLimit: number;
  onSelectImages: (media: any[]) => void;
  children?: any;
}

const CustomGallery = (props: CustomGalleryProps) => {
  const {
    images,
    numOfColums,
    isRefresh,
    albums,
    isAlbumListVisible,
    selectedAlbum,
    isDisabled,
    openGalleryModal,
    showDoneButton,
    isNextPage,
    imageError,
    onImageError,
    handleOpenGallery,
    onDonePress,
    onSelectImage,
    onAlbumPress,
    selectAlbum,
    handleClosePress,
    getGallaryImages,
  } = useGalleryView(props);
  if (Platform.OS === 'ios') {
    return null;
  }
  return (
    <TouchableOpacity onPress={handleOpenGallery} disabled={isDisabled}>
      {props.children}
      <Modal
        animationType="fade"
        transparent
        visible={openGalleryModal}
        style={styles.modalStyle}
      >
        <SafeAreaView style={styles.root}>
          <GalleryHeader
            onSelectedAlbumPress={onAlbumPress}
            selectedAlbum={selectedAlbum}
            isAlbumListVisible={isAlbumListVisible}
            onClosePress={handleClosePress}
            onDonePress={onDonePress}
            showDoneButton={showDoneButton}
          />
          {isAlbumListVisible ? (
            <AlbumList data={albums} onAlbumNamePress={selectAlbum} />
          ) : (
            <FlatList
              style={styles.container}
              data={images}
              numColumns={numOfColums}
              extraData={isRefresh}
              keyExtractor={(item, index) => `${item}_${index}`}
              renderItem={({ item, index }) => {
                const { node: { image = {} } = {}, selected = false }: any =
                  item;
                const { uri = '', playableDuration = 0 }: any = image || {};
                if (imageError || typeof uri !== 'string') {
                  return null;
                }
                return (
                  <TouchableOpacity
                    key={`image_${index}`}
                    activeOpacity={0.8}
                    style={styles.imageBoxContainer}
                    onPress={() => onSelectImage(index)}
                  >
                    {!!selected && (
                      <Icon
                        color="black"
                        style={styles.checkedIcon}
                        name="check-circle"
                        size={20}
                      />
                    )}
                    {playableDuration ? (
                      <View style={styles.playIcon}>
                        <Icon color="white" name="play-arrow" size={40} />
                      </View>
                    ) : (
                      <></>
                    )}
                    <Image
                      style={styles.imageContainer}
                      source={{ uri: uri }}
                      onError={onImageError}
                    />
                  </TouchableOpacity>
                );
              }}
              onEndReached={() => {
                if (isNextPage) {
                  getGallaryImages();
                }
              }}
            />
          )}
        </SafeAreaView>
      </Modal>
    </TouchableOpacity>
  );
};

export default CustomGallery;
