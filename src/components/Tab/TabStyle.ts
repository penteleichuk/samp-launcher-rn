import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  tab: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: scale(11),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: scale(12),
    marginRight: scale(5),
    marginBottom: verticalScale(8),
    color: '#fff',
  },
  anim: {
    width: scale(50),
  },
  active: {
    backgroundColor: '#ef72ff3a',
  },
});
