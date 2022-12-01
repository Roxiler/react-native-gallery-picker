import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import { checkAppPermission } from '../utils/common';
export const useGalleryView = (props: any) => {
  const { type, selectionLimit = 1, onSelectImages, onCameraPress } = props;
  const TYPE_MAPPING: any = {
    Video: 'Videos',
    Photo: 'Photos',
    All: 'All',
  };
  const assetType = TYPE_MAPPING[type || 'All'];
  const [images, setImages]: any = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [lastCursor, setLastCursor] = useState('');
  const [selectedImages, setSelectedImages]: any = useState([]);
  const [imageError, setImageError] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);
  const [albums, setAlbums]: any = useState([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      after: lastCursor ? lastCursor : undefined,
      groupName: selectedAlbum === 'Gallery' ? '' : selectedAlbum,
      include: ['fileSize', 'filename', 'playableDuration'],
    })
      .then((r) => {
        setLastCursor(r.page_info.end_cursor || '');
        setIsNextPage(r.page_info.has_next_page);
        const newImageArray = [...images];
        setImages([...newImageArray, ...r.edges]);
        refreshList();
      })
      .catch((error) => {
        console.log(error);
        handleClosePress();
      });
  };

  const getAllAlbums = () => {
    CameraRoll.getAlbums({
      assetType: 'All',
    })
      .then((r) => {
        setAlbums([{ title: 'Gallery' }, ...r]);
      })
      .catch((error) => {
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
      const { selected = false } = images[index];
      if (!selected && filterSelected.length < selectionLimit) {
        const newFile = images[index];
        setSelectedImages([...selectedImages, getDesiredFileParams(newFile)]);
        images[index].selected = true;
      } else {
        const newFile = images[index];
        const newArray = selectedImages.filter(
          (data: any) =>
            data?.fileName !== getDesiredFileParams(newFile).fileName
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
        // eslint-disable-next-line @typescript-eslint/no-shadow
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
      // eslint-disable-next-line @typescript-eslint/no-shadow
      type = '',
      uri = '',
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
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (isGranted) {
      launchCamera({
        mediaType: 'photo',
        quality: 0.8,
      })
        .then((result) => {
          const { assets = [] } = result;
          onSelectImages(getDesiredFileFromCamera(assets));
        })
        .catch((error) => {
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
    if (title !== selectedAlbum) {
      setImages([]);
    }
    setSelectedAlbum(title);
    setIsAlbumListVisible(false);
    setSelectedImages([]);
  };

  const handleOpenGallery = async () => {
    const isGranted = await checkAppPermission(
      'Needs access to storage',
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    if (isGranted) {
      setOpenGalleryModal(true);
      setIsDisabled(true);
    }
  };

  const handleClosePress = () => {
    setSelectedImages([]);
    setOpenGalleryModal(false);
    setIsDisabled(false);
    setImages([]);
    setLastCursor('');
    setIsNextPage(false);
  };
  const onImageError = () => {
    setImageError(true);
  };
  return {
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
    isNextPage,
    imageError,
    onImageError,
    handleClosePress,
    onDonePress,
    onSelectImage,
    onAlbumPress,
    selectAlbum,
    launchAppCamera,
    handleOpenGallery,
    getGallaryImages,
  };
};
