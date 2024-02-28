import {StyleSheet} from 'react-native';
import {scale} from '../../../helpers/demensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
    borderRadius: 15,
    overflow: 'hidden',
  },
  cover: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingBottom: 20,
    paddingLeft: 20,
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: scale(13),
  },
  created: {
    marginTop: 3,
    fontSize: scale(11),
    color: '#bcbcbc',
  },
});
