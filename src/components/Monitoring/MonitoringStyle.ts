import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {PADDING_HORIZONTAL, scale} from '../../helpers/demensions';

export const styles = StyleSheet.create({
  monitoring: {
    // height: '100%',
    paddingBottom: verticalScale(20),
    paddingHorizontal: PADDING_HORIZONTAL,
    marginTop: verticalScale(15),
    alignContent: 'space-between',
  },
  monitorings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#fff',
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: verticalScale(15),
    fontWeight: '400',
    fontSize: scale(15),
    color: '#ffffff',
  },
  body: {
    width: '48%',
    marginBottom: verticalScale(15),
    borderRadius: scale(10),
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderStyle: 'solid',
    borderRadius: scale(10),
    paddingHorizontal: scale(13),
    paddingVertical: verticalScale(18),
  },
  bonusLinear: {
    position: 'absolute',
    top: -verticalScale(12),
    right: scale(5),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(3),
    borderRadius: scale(3),
    transform: [{rotateY: '20deg'}, {rotateX: '-20deg'}],
  },
  bonus: {
    fontSize: scale(17),
    fontWeight: '800',
    color: '#fff',
  },
  content: {
    borderColor: '#b982da',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  anims: {
    width: verticalScale(80),
    height: verticalScale(80),
    overflow: 'hidden',
    borderRadius: scale(80) / 2,

    borderWidth: verticalScale(2),
    borderColor: '#8ab5f3',
  },
  animsEmpty: {
    width: verticalScale(100),
    height: verticalScale(100),
    overflow: 'hidden',
    borderRadius: verticalScale(80) / 2,
  },
  anim: {},
  info: {
    width: '100%',
    marginTop: verticalScale(15),
  },
  subtitle: {
    color: '#8ab5f3',
    fontSize: scale(15),
    fontWeight: '600',
    textAlign: 'center',
  },
  static: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: scale(8),
  },
  online: {
    color: '#ffffff',
    fontSize: scale(14),
    textAlign: 'center',
  },
  subOnline: {
    fontWeight: '400',
    color: '#b7b7b7',
  },
});
