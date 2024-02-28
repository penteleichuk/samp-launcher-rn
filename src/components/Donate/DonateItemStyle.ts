import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../helpers/demensions';

export const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    fontSize: scale(15),
    marginTop: verticalScale(20),
    paddingHorizontal: scale(15),
  },
  donate: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#42234f7d',
    borderRadius: scale(13),
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: verticalScale(14),
  },
  gapLeft: {
    marginRight: scale(7),
  },
  gapRight: {
    marginLeft: scale(7),
  },
  gapNone: {
    marginRight: 0,
  },
  badge: {
    position: 'absolute',
    top: verticalScale(-7),
    right: scale(3),
    elevation: 5,
    color: '#fff',
    paddingHorizontal: scale(7),
    paddingVertical: verticalScale(3),
    borderRadius: scale(4),
    zIndex: 100,
  },
  proster: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',

    borderWidth: scale(2),
    backgroundColor: '#1a0c1864',
    borderColor: '#e26ec180',
    width: scale(70),
    height: scale(70),
    borderRadius: scale(50),
  },
  image: {
    resizeMode: 'cover',
    width: scale(50),
    height: verticalScale(50),
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    marginTop: verticalScale(10),
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  name: {
    textAlign: 'center',
    color: '#e9f7ff',
    fontSize: scale(11),
    fontWeight: '400',
  },
  price: {
    backgroundColor: '#ea55c580',
    color: 'rgba(255,255,255,0.84)',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(7),
    borderRadius: scale(15),
    fontWeight: '500',
    fontSize: scale(12),
    textAlign: 'center',
  },
  scont: {
    textDecorationLine: 'line-through',
    color: '#fdc894d6',
  },
  link: {
    marginTop: verticalScale(15),
    display: 'flex',
    alignItems: 'center',
  },
  success: {
    backgroundColor: '#2c7e2e',
  },
  danger: {
    backgroundColor: '#b63939',
  },
  info: {
    backgroundColor: '#2e8d84',
  },
});
