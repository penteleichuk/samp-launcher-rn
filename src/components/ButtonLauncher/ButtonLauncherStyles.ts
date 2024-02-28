import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  button: {
    position: 'relative',
    // display: "none",
    display: 'flex',
    flexDirection: 'row',
    minWidth: verticalScale(216),
    minHeight: verticalScale(44),
    alignSelf: 'center',
    textAlignVertical: 'center',
    borderRadius: verticalScale(9),
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: 'rgb(176,126,222)',
    elevation: 10,
  },
  text: {
    fontSize: verticalScale(14),
    color: '#fff',
    fontWeight: '600',
  },
  icon: {
    marginRight: verticalScale(10),
    width: verticalScale(14),
    height: verticalScale(14),
  },
  iconRight: {
    position: 'absolute',
    right: verticalScale(20),
    width: verticalScale(9),
    height: verticalScale(10),
    marginLeft: verticalScale(10),
  },
});
