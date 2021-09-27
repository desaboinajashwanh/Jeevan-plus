import React, {Component} from 'react';
import {styles} from './CameraComponent.styles';
import {RNCamera} from 'react-native-camera';
import {Text, FAB} from 'react-native-paper';
import {
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePreviewComponent from '../ImagePreviewComponent/ImagePreviewComponent';

class CameraClassComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: null,
      flashMode: RNCamera.Constants.FlashMode.off,
      capturedImageUri: null,
      IsModalVisible: false,
    };
  }

  componentDidMount() {
    this.setState({screenWidth: Dimensions.get('window').width});
  }

  static getDerivedStateFromProps(props, state) {
    return {isFocused: props.isFocused};
  }

  toggleFlash = () => {
    this.setState(
      (state, props) => ({
        flashMode:
          state.flashMode === RNCamera.Constants.FlashMode.on
            ? RNCamera.Constants.FlashMode.off
            : RNCamera.Constants.FlashMode.on,
      }),
      () => console.log(this.state),
    );
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.setState({capturedImageUri: data.uri});
    }
  };

  showImagePreview = () => {
    this.setState({IsModalVisible: true}, () => console.log(this.state));
  };

  closeImagePreview = () => {
    this.setState({IsModalVisible: false});
  };

  gotoPredictScreen = () => {
    if (this.props.navigation)
      this.props.navigation.navigate('HealthPredection');
  };

  render() {
    const {
      screenWidth,
      flashMode,
      capturedImageUri,
      IsModalVisible,
      isFocused,
    } = this.state;

    console.log(capturedImageUri);

    if (screenWidth && isFocused)
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
          {capturedImageUri && (
            <ImagePreviewComponent
              capturedImageUri={capturedImageUri}
              IsModalVisible={IsModalVisible}
              closeImagePreview={this.closeImagePreview}
              gotoPredictScreen={this.gotoPredictScreen}
            />
          )}

          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              captureAudio={false}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={flashMode}
              autoFocus={true}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />

            {/* <View style={{flex: 1, backgroundColor: 'transparent'}}></View> */}

            {capturedImageUri && (
              <FAB
                style={styles.toPredictScreenFab}
                small
                icon="check"
                color={'#fff'}
                onPress={() => this.gotoPredictScreen()}
              />
            )}

            <View style={{...styles.cameraControlPanel, width: screenWidth}}>
              <View style={{...styles.panelControls}}>
                <Pressable onPress={() => this.toggleFlash()}>
                  <MaterialIcon
                    name={
                      flashMode ? 'lightning-bolt' : 'lightning-bolt-outline'
                    }
                    color={'rgba(255,255,255,1)'}
                    size={35}
                  />
                </Pressable>
              </View>
              <View style={{...styles.panelControls, flex: 0.5}}>
                <Pressable onPress={() => this.takePicture()}>
                  <Icon name="circle" color={'rgba(255,255,255,1)'} size={80} />
                </Pressable>
              </View>

              <Pressable
                onPress={() => this.showImagePreview()}
                style={{
                  ...styles.panelControls,
                  backgroundColor: 'transparent',
                }}>
                <Image
                  source={
                    capturedImageUri
                      ? {uri: capturedImageUri}
                      : require('../../assets/placeholder.png')
                  }
                  style={{height: '70%', width: '70%', borderRadius: 4}}
                />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );

    return null;
  }
}

export default function CameraComponent(props) {
  return <CameraClassComponent {...props} isFocused={useIsFocused()} />;
}
