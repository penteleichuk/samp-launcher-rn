import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(46, 44, 54, 58)',
  },
  contentContainerStyle: {
    position: 'relative',
    flex: 1,
    padding: scale(15),
    marginHorizontal: scale(25),
    marginBottom: verticalScale(10),
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  customBackground: {
    flex: 1,

    borderRadius: scale(24),
    marginHorizontal: scale(24),

    backgroundColor: '#2E2C35',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
});
