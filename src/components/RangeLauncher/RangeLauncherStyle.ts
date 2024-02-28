import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { scale } from '../../helpers/demensions';

export const styles = StyleSheet.create({
  range: {
    marginBottom: verticalScale(10),
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(14),
    color: '#ffffff',
    marginBottom: verticalScale(1),
  },
  number: {
    textAlign: 'center',
    width: scale(20),
    fontSize: scale(14),
    color: '#fff',
    marginLeft: scale(20),
  },
});
