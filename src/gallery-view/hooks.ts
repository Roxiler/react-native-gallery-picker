import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, PermissionsAndroid} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {checkAppPermission} from '../utils/common';
export const useGalleryView = (props: any) => {
  const {
    type,
    visible,
    selectionLimit = 1,
    onSelectImages,
    onCameraPress,
    onClose,
  } = props;
  const TYPE_MAPPING = {
    video: 'Videos',
    photo: 'Photos',
    mixed: 'All',
  };
  const assetType = TYPE_MAPPING[type];
  const [images, setImages] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [lastCursor, setLastCursor] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [isAlbumListVisible, setIsAlbumListVisible] = useState(false);
  const [openGalleryModal, setOpenGalleryModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showDoneButton, setShowDoneButton] = useState(false);
  const isMounted = useRef(false);
  const window = Dimensions.get('window');

  const filterSelected =
    images.length > 0 ? images.filter((item: any) => item.selected) : [];
  const numOfColums = 3;

  useEffect(() => {
    if (openGalleryModal) {
      isMounted.current = true;
      if (isMounted.current) {
        getGallaryImages();
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [selectedAlbum, openGalleryModal]);

  useEffect(() => {
    if (selectedImages.length > 0) {
      setShowDoneButton(true);
    } else {
      setShowDoneButton(false);
    }
  }, [selectedImages]);

  useEffect(() => {
    getAllAlbums();
  }, []);

  const onDonePress = () => {
    onSelectImages(selectedImages);
    setSelectedImages([]);
    handleClosePress();
  };
  const getGallaryImages = async () => {
    CameraRoll.getPhotos({
      first: 50,
      assetType: assetType,
      groupName: selectedAlbum === 'Gallery' ? '' : selectedAlbum,
      include: ['fileSize', 'filename', 'playableDuration'],
    })
      .then(r => {
        setLastCursor(r.page_info.end_cursor || '');
        setImages(r.edges);
        refreshList();
      })
      .catch(error => {
        console.log(error);
        onClose();
      });
  };

  const getAllAlbums = () => {
    CameraRoll.getAlbums({
      assetType: assetType,
    })
      .then(r => {
        setAlbums([{title: 'Gallery'}, ...r]);
      })
      .catch(error => {
        console.log(error);
        handleClosePress();
      });
  };

  const refreshList = () => {
    setRefresh(!isRefresh);
  };

  const onSelectImage = (index: number) => {
    if (selectionLimit === 1) {
      const newFile = images[index];
      onSelectImages([getDesiredFileParams(newFile)]);
    } else if (selectionLimit > 1) {
      const {selected = false} = images[index];
      if (!selected && filterSelected.length < selectionLimit) {
        const newFile = images[index];
        setSelectedImages([...selectedImages, getDesiredFileParams(newFile)]);
        images[index].selected = true;
      } else {
        const newFile = images[index];
        const newArray = selectedImages.filter(
          data => data?.fileName !== getDesiredFileParams(newFile).fileName,
        );
        setSelectedImages(newArray);
        images[index].selected = false;
      }
      setImages(images);
      refreshList();
    }
  };

  const getDesiredFileParams = (file: any) => {
    const {
      node: {
        image: {
          fileSize = 0,
          filename = '',
          playableDuration = 0,
          uri = '',
        } = {},
        type = '',
      } = {},
    } = file || {};
    return {
      fileName: filename,
      type: type,
      uri: uri,
      size: fileSize,
      duration: playableDuration,
    };
  };

  const getDesiredFileFromCamera = (file: any) => {
    const {
      fileName = '',
      fileSize = 0,
      type = '',
      uri = '',
      width = 3000,
      duration = 0,
    } = file[0] || {};
    return {
      fileName: fileName,
      type: type,
      uri: uri,
      size: fileSize,
      duration: duration,
    };
  };

  const launchAppCamera = async () => {
    const isGranted = await checkAppPermission(
      'Needs access to camera',
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (isGranted) {
      launchCamera({
        mediaType: 'photo',
        quality: 0.8,
      })
        .then(result => {
          const {assets = []} = result;
          onSelectImages(getDesiredFileFromCamera(assets));
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          handleClosePress();
        });
    } else {
      console.log('else');
    }
  };

  const onAlbumPress = () => {
    setIsAlbumListVisible(!isAlbumListVisible);
  };

  const selectAlbum = (title: string) => {
    setSelectedAlbum(title);
    setIsAlbumListVisible(false);
    setSelectedImages([]);
  };

  const handleOpenGallery = () => {
    setOpenGalleryModal(true);
    setIsDisabled(true);
  };

  const handleClosePress = () => {
    // if (onClose) {
    //   onClose();
    // } else {
      setSelectedImages([]);
      setOpenGalleryModal(false);
      setIsDisabled(false);
    // }
  };

  return {
    visible,
    onClose,
    images,
    onCameraPress,
    numOfColums,
    isRefresh,
    window,
    albums,
    selectedImages,
    isAlbumListVisible,
    selectedAlbum,
    openGalleryModal,
    isDisabled,
    showDoneButton,
    onSelectImages,
    handleClosePress,
    onDonePress,
    onSelectImage,
    onAlbumPress,
    selectAlbum,
    launchAppCamera,
    handleOpenGallery,
  };
};
