import { Dimensions, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { scale } from '../helpers/demensions';
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'Rubik',
    backgroundColor: '#201f20',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'center',
  },
  logoWrapper: {
    marginTop: verticalScale(50),
  },
  logo: {
    width: verticalScale(110),
    height: verticalScale(151),
    alignSelf: 'center',
  },
  titleSub: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: scale(24),
    fontWeight: '700',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '600',
  },
  titleUppercase: {
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: scale(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(50),
  },
  emoji: {
    fontSize: scale(20),
  },
  buttons: {},
  description: {
    textTransform: 'uppercase',
    fontSize: scale(12),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  footer: {},
  iconInfo: {
    alignSelf: 'center',
    height: verticalScale(70),
    width: verticalScale(70),
  },
  accent: {
    color: '#5476db',
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  alert: {
    textAlign: 'center',
    color: '#fff',
    fontSize: scale(12),
    borderRadius: verticalScale(9),
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(10),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(5),
    width: width - verticalScale(40),
  },
  progress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTitle: {
    color: '#fff',
    fontSize: scale(12),
    marginTop: verticalScale(45),
    marginBottom: verticalScale(6),
  },
  progressName: {},
  progressMemory: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  progressSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: scale(12),
    textAlign: 'center',
    marginTop: verticalScale(17),
  },
  progressPercent: {
    fontWeight: '700',
    color: '#5476db',
    textAlign: 'center',
    marginTop: verticalScale(15),
    fontSize: scale(24),
  },
  unpacking: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scale(16),
    textAlign: 'center',
    marginBottom: verticalScale(6),
    marginTop: verticalScale(42),
  },
  starting: {
    color: '#fff',
    fontWeight: '600',
    marginTop: verticalScale(38),
    fontSize: scale(12),
    textAlign: 'center',
  },
});
