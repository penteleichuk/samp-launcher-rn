import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../helpers/demensions';

export const styles = StyleSheet.create({
  donate: {
    display: 'flex',
    flex: 1,
  },
  body: {},
  title: {
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: scale(15),
    color: '#ffffff',
    marginBottom: verticalScale(10),
  },
});
