import {StyleSheet} from 'react-native';
import {
  PADDING_HORIZONTAL,
  scale,
  verticalScale,
} from '../../helpers/demensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: scale(15),
    color: '#ffffff',
  },
  content: {},
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: '#212231',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: 25,
  },
});
