import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { scale } from '../../helpers/demensions';

export const styles = StyleSheet.create({
  body: {
    width: '48%',
    height: verticalScale(200),
    marginBottom: verticalScale(15),
    borderRadius: scale(10),
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    position: 'relative',
    borderStyle: 'solid',
  },
  linear: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: scale(15),
    color: '#ffffff',
    textAlign: 'center',
  },
});
