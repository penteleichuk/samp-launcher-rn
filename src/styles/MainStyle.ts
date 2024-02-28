import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageBackground: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: verticalScale(15),
    paddingBottom: 80,
  },
});
