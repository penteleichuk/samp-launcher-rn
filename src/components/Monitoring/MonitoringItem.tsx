import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Lottie from 'lottie-react-native';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { setSelectServer } from '../../actions/appActions';
import * as Anims from '../../assets/anims';
import { PeopleSvg } from '../../assets/svg';
import { scale, verticalScale } from '../../helpers/demensions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ServerOnlineType } from '../../reducers/serverReducer';
import { fetchServers } from '../../thunks/serverThunks';
import { styles } from './MonitoringStyle';

type MonitoringItemType = ServerOnlineType & {
  detachedServerRef: React.ForwardedRef<BottomSheetModal>;
};

const AnimsList = {
  1: Anims.Rocket,
  2: Anims.Rocket,
  3: Anims.Rocket,
  100: Anims.Hacker,
};

export const MonitoringItem = React.memo(
  ({ detachedServerRef, ...props }: MonitoringItemType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchServers());
    }, []);

    const selectServerHandler = useCallback(() => {
      dispatch(setSelectServer({ selectedServer: props.id }));
      detachedServerRef?.current?.present();
    }, [props.id]);

    return (
      <TouchableOpacity onPress={selectServerHandler} style={styles.body}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          colors={['#414673c9', '#262839']}
          style={styles.item}>
          <View style={styles.content}>
            <View style={styles.anims}>
              <Lottie
                style={styles.anim}
                resizeMode="cover"
                source={AnimsList[props.id]}
                autoPlay
                loop
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.subtitle}>{props.name}</Text>
              <View style={styles.static}>
                {props.loading && (
                  <ActivityIndicator size="small" color="#719ff0" />
                )}
                {!props.loading && props.status && (
                  <>
                    <PeopleSvg
                      style={{ marginRight: scale(5) }}
                      width={scale(17)}
                      height={verticalScale(17)}
                      fill={'#fff'}
                    />
                    <Text style={styles.online}>
                      {props.online ?? 50}
                      <Text style={styles.subOnline}>
                        {' '}
                        / {props.slot ?? 100}
                      </Text>
                    </Text>
                  </>
                )}
                {!props.loading && !props.status && (
                  <Text style={styles.online}>Недоступно</Text>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  },
);
