# react-native-gallery-picker

Gallery View for React Native

## Installation

```sh
npm install react-native-gallery-picker
```
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
  	```
      implementation project(':@react-native-camera-roll_camera-roll')
  	```
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
    visible={true} 
    type="Mix" 
    selectionlimit={10} 
    onSelectImages={(images)=>console.log(images)}>
    { ... }
    </CustomGallery>
)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
