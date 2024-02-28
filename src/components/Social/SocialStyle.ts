import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  social: {
    flexDirection: 'column',
    marginBottom: scale(15),
    paddingBottom: scale(15),
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: scale(15),
    color: '#ffffff',
    marginBottom: verticalScale(10),
  },
  link: {
    alignItems: 'center',
  },
  icon: {},
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  case: {
    width: '22%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scale(10),
    paddingBottom: scale(7),
    marginRight: scale(5),
    borderRadius: scale(15),
  },
  image: {
    width: verticalScale(25),
    height: verticalScale(25),
  },
  subtitle: {
    fontSize: scale(11),
    color: '#CCC',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: verticalScale(6),
  },
});
