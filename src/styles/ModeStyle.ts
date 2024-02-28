import { StyleSheet } from 'react-native';
import { scale } from '../helpers/demensions';

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleSub: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: scale(24),
    fontWeight: '700',
  },
});
