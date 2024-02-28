import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../helpers/demensions';

export const styles = StyleSheet.create({
  event: {
    fontSize: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
    borderRadius: scale(15),
    marginRight: scale(5),
  },

  green: {
    color: 'rgba(121, 255, 57, 1)',
    backgroundColor: 'rgba(121, 255, 57, 0.15)',
  },

  blue: {
    color: 'rgba(131, 200, 241, 1)',
    backgroundColor: 'rgba(18, 75, 107, 1)',
  },

  red: {
    color: 'rgba(255, 190, 190, 1)',
    backgroundColor: 'rgba(169, 61, 61, 1)',
  },

  orange: {
    color: 'rgba(248, 190, 41, 1)',
    backgroundColor: 'rgba(248, 190, 41, 0.15)',
  },

  light: {
    color: 'rgb(180,179,179)',
    backgroundColor: 'rgba(132, 132, 132, 0.15)',
  },
});
