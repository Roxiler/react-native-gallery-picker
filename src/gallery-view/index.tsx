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
// import { CheckIcon, CloseIcon } from './images'
import { styles } from './styles';

interface CustomGalleryProps {
  visible: boolean;
  type: string;
  selectionLimit: number;
  onClose?: () => void;
  onSelectImages: (media: any[]) => void;
  children?: any;
}

const CustomGallery = (props: CustomGalleryProps) => {
  const {
    onClose,
    images,
    numOfColums,
    isRefresh,
    window,
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
        onRequestClose={onClose}
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
              style={{ flex: 1 }}
              data={images}
              numColumns={numOfColums}
              extraData={isRefresh}
              renderItem={({ item, index }) => {
                const { node: { image = {} } = {}, selected = false }: any =
                  item;
                const { uri = '', playableDuration = 0 }: any = image || {};
                if (imageError || typeof uri !== 'string') {
                  return null;
                }
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
