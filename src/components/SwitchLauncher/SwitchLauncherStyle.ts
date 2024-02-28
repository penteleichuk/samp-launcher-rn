import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../helpers/demensions';

export const styles = StyleSheet.create({
  switch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  title: {
    fontSize: scale(14),
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '500',
  },
});
