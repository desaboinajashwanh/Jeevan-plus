import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

export default class ExampleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusCoordinates: null,
      viewHeight: null,
      viewWidth: null,
    };
  }

  focusOn = ({x, y}) => {
    const {viewHeight, viewWidth} = this.state;

    if (viewHeight && viewWidth && x && y) {
      console.log('---------- focus points ------------');
      console.log(x);
      console.log(y);
      this.setState(
        {
          focusCoordinates: [x / viewWidth, y / viewHeight],
        },
        () => console.log(this.state),
      );
    }
  };

  find_dimesions = layout => {
    const {x, y, width, height} = layout;

    if (!this.state.viewHeight && !this.state.viewWidth) {
      this.setState({
        viewWidth: width,
        viewHeight: height,
      });
    }
  };

  getFocusPoints = () => {
    const {focusCoordinates} = this.state;
    const temp = focusCoordinates
      ? {x: focusCoordinates[0], y: focusCoordinates[1]}
      : {x: 0.5, y: 0.5};

      console.log(temp);

      return temp;
  };
  render() {
    return (
      <View
        style={styles.container}
        onLayout={event => {
          this.find_dimesions(event.nativeEvent.layout);
        }}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          onTap={(x, y) => this.focusOn(x, y)}
          >
          {({camera, status, recordAudioPermissionStatus}) => {
            //console.log(camera);
            //console.log(status);
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.takePicture(camera)}
                  style={styles.capture}>
                  <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
