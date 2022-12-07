# react-native-gallery-picker(Android Only)

Gallery View for React Native to pick images from device storage.

## Installation

```sh
npm install react-native-gallery-picker
```
## Checkout below gif.

![](https://media.giphy.com/media/9FyfVFnNHFbm7Ynbyw/giphy.gif)
### Required Installation steps

npm install @react-native-camera-roll/camera-roll --save`

1. Open up `android/app/src/main/java/[...]/MainApplication.java` (Auto link, ^RN0.69 does not required)

- Add `import com.reactnativecommunity.cameraroll.CameraRollPackage;` to the imports at the top of the file
- Add `new CameraRollPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':@react-native-camera-roll_camera-roll'
   project(':@react-native-camera-roll_camera-roll').projectDir = new File(rootProject.projectDir, 	'../node_modules/@react-native-camera-roll/camera-roll/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ` implementation project(':@react-native-camera-roll_camera-roll') `
   Starting with Android 10, the concept of [scoped storage](https://developer.android.com/training/data-storage#scoped-storage) is introduced. Currently, to make it working with that change, you have to add `android:requestLegacyExternalStorage="true"` to `AndroidManifest.xml`:

```xml
<manifest ... >
  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```

## Usage

```js
import CustomGallery from 'react-native-gallery-picker';

// ...

return (
    <CustomGallery
    type="Mix"
    selectionlimit={10}
    onSelectImages={(images)=>console.log(images)}>
    { childern }
    </CustomGallery>
)
```

List of props that you can pass down to the ProgressBar Component:
| Property | Description | Default Value|Type|
| ----------- | ----------- | ------------ |----|
|type|Specifies filter on Asset type |'All'|enum("Photo","Video","All")|
|selectionlimit|Limit on media selection|1|integer|
|onSelectImages|onSelectImages is event handler function which gets executed when clicked on done after selecting files,first parameter will return array of files. |(files) => void;|Function
