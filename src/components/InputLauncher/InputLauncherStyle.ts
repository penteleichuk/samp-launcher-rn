import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../helpers/demensions';

export const styles = StyleSheet.create({
  input: {},
  inputOpacity: {
    position: 'relative',
  },
  inputText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: scale(14),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderRadius: scale(12),
    backgroundColor: 'rgba(194, 214, 255, 0.1)',
  },
  title: {
    fontSize: scale(15),
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: verticalScale(5),
  },
  icon: {
    position: 'absolute',
    left: scale(15),
    bottom: verticalScale(13),
  },
});
