import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../../helpers/demensions';

export const styles = StyleSheet.create({
  sheet: {},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerAnims: {
    width: verticalScale(50),
    height: verticalScale(50),
    borderRadius: verticalScale(50),
    borderWidth: verticalScale(2),
    borderColor: '#8ab5f3',
  },

  headerAnim: {},

  headerText: {
    marginLeft: scale(10),
    flex: 1,
  },

  headerTitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: verticalScale(14),
    fontWeight: '400',
  },

  headerSubtitle: {
    fontWeight: '600',
    color: '#fff',
    fontSize: verticalScale(17),
  },

  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  HeaderPing: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  HeaderPingIcon: {
    marginRight: verticalScale(5),
  },

  HeaderPingText: {
    color: '#76d17f',
    fontSize: verticalScale(11),
    fontWeight: '400',
    textTransform: 'uppercase',
  },

  online: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(24),
  },

  onlineIcon: {
    marginRight: verticalScale(7),
  },

  onlineText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: verticalScale(15),
  },

  onlineTextPeople: {
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
  },

  event: {},

  eventTitle: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: verticalScale(12),
    fontWeight: '400',
    marginBottom: verticalScale(8),
  },

  eventContent: {
    display: 'flex',
    flexDirection: 'row',
  },

  buttons: {
    marginTop: verticalScale(25),
  },
});
