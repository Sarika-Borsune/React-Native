To use vector Icons =>
1.install library =>
- npm i react-native-vector-icons or yarn add react-native-vector-icons
2.add below line  in android/app/build.gradle file 
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

To Add custom fonts:
1.download the fonts from google
2.create assets folder => create fonts folder => paste the fonts which you want = >
3.create react-native.config.js file => inside this file add below code =>

module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts'], // stays the same
};

4. link font family using below command
npx react-native-asset
