import {StyleSheet} from 'react-native';

const styleObject = StyleSheet.create({
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
  cameraControlPanel: {
    position: 'absolute',
    height: 80,
    backgroundColor: 'transparent',
    bottom: '5%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  panelControls: {
    backgroundColor: 'transparent',
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toPredictScreenFab: {
    position: 'absolute',
    margin: 0,
    right: 0,
    top: "8%",
    right: "5%",
    backgroundColor: "#68ca87",
    elevation: 1
  },
});

export const styles = StyleSheet.create(styleObject);
