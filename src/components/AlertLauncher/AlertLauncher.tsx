import React from 'react';
import { Dimensions } from 'react-native';
import AwesomeAlert, { AwesomeAlertProps } from 'react-native-awesome-alerts';
import { scale, verticalScale } from '../../helpers/demensions';
const width = Dimensions.get('window').width;

export const AlertLauncher = React.memo((props: AwesomeAlertProps) => {
  return (
    <AwesomeAlert
      {...props}
      // Фон
      useNativeDriver={true}
      alertContainerStyle={{
        backgroundColor: '#010d3b3b',
      }}
      // Фон
      overlayStyle={
        {
          // backgroundColor: '#000000b7',
        }
      }
      // progressSize=""
      // progressColor=""

      // Фон диалога
      contentContainerStyle={{
        width: width,
        // padding: 0,
        borderRadius: scale(9),
        overflow: 'hidden',
        backgroundColor: '#151a2b',
      }}
      // Стили контента
      contentStyle={
        {
          // padding: scale(15),
          // backgroundColor: '#6a2f81',
        }
      }
      titleStyle={{
        fontSize: scale(15),
        color: '#d4ddff',
        fontWeight: '500',
      }}
      messageStyle={{
        paddingVertical: verticalScale(15),
        fontSize: scale(12),
        color: '#fff',
      }}
      actionContainerStyle={
        {
          // margin: 0,
          // padding: 0,
        }
      }
      cancelButtonStyle={{
        // marginLeft: 0,
        // marginRight: 0,
        // marginBottom: 0,
        backgroundColor: '#6b8afd',
        flex: 100,
        borderRadius: scale(12),
      }}
      cancelButtonTextStyle={{
        padding: scale(4),
        fontSize: scale(12),
        fontWeight: '700',
        textAlign: 'center',
      }}
      confirmButtonStyle={{
        // marginLeft: 0,
        // marginRight: 0,
        // marginBottom: 0,
        backgroundColor: '#6b8afd',
        flex: 100,
        borderRadius: scale(12),
      }}
      confirmButtonTextStyle={{
        padding: scale(4),
        fontSize: scale(12),
        fontWeight: '700',
        textAlign: 'center',
      }}
    />
  );
});
