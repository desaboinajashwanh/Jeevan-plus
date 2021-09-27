import {StyleSheet} from 'react-native';

const styleObject = {
  container: {
    flex: 1,
    padding: 5,
    marginTop: '6%',
  },
  statusCard: {
    borderRadius: 70,
    elevation: 0,
    borderLeftWidth: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export const styles = StyleSheet.create(styleObject);
