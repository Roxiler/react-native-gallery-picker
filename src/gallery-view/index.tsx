import React from 'react';
import {
  FlatList,
  Image,
  Modal,
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

interface CustomGallaryProps {
  visible: boolean;
  type: string;
  selectionLimit: number;
  onClose?: () => void;
  onCameraPress?: () => void;
  onSelectImages?: (media: any[]) => void;
  children?: any;
}

const CustomGallary = (props: CustomGallaryProps) => {
  const {
    // visible,
    onClose,
    images,
    numOfColums,
    isRefresh,
    window,
    albums,
    // onCameraPress,
    isAlbumListVisible,
    selectedAlbum,
    isDisabled,
    openGalleryModal,
    showDoneButton,
    // onSelectImages,
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
        // enableDismisOnTouchOutside
        onRequestClose={onClose}
        style={{ justifyContent: 'flex-end' }}
      >
        <SafeAreaView style={styles.root}>
          <GalleryHeader
            onSelectedAlbumPress={onAlbumPress}
            selectedAlbum={selectedAlbum}
            isAlbumListVisible={isAlbumListVisible}
            onClosePress={handleClosePress}
            onDonePress={onDonePress}
            showDoneButton={showDoneButton}
            launchAppCamera={launchAppCamera}
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
                      style={{
                        width: '100%',
                        height: `100%`,
                      }}
                      source={{ uri: uri }}
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
