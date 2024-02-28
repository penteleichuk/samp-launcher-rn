import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Lottie from 'lottie-react-native';
import React, { useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { setAlertUserName } from '../../../actions/alertActions';
import { NetworkSvg, PeopleSvg, PlaySvg } from '../../../assets/svg';
import { getRndInteger } from '../../../helpers';
import { verticalScale } from '../../../helpers/demensions';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectSelectedServer } from '../../../selectors/appSelectors';
import { selectProjectName } from '../../../selectors/distributionSelectors';
import { selectServer } from '../../../selectors/serverSelectors';
import { selectUserName } from '../../../selectors/settingSelectors';
import { ButtonLauncher } from '../../ButtonLauncher/ButtonLauncher';
import { Event } from '../../Event/Event';
import DetachedContent from '../../Provider/Detached/DetachedContent';
import * as Anims from './../../../assets/anims';
import GtaSetupModule from './../../../modules/GtaSetupModule';
import { styles } from './SheetServerStyle';

type SheetServerProps = {
  bottomInset?: number;
};

const AnimsList = {
  1: Anims.Rocket,
  2: Anims.Rocket,
  3: Anims.Rocket,
  100: Anims.Hacker,
};

export const SheetServerComponent = React.memo(
  React.forwardRef<BottomSheetModal, SheetServerProps>((props, ref) => {
    const userName = useAppSelector(selectUserName);
    const projectName = useAppSelector(selectProjectName);
    const selectedServer = useAppSelector(selectSelectedServer);
    const server = useAppSelector(state => selectServer(state, selectedServer));

    const dispatch = useAppDispatch();
    const { dismissAll } = useBottomSheetModal();

    const onPressPlayHandler = useCallback(async () => {
      if (userName.length < 1) {
        dispatch(setAlertUserName(true));
      } else {
        await GtaSetupModule.startGame();
      }

      dismissAll();
    }, [userName]);

    return (
      <DetachedContent
        name="SheetServer"
        ref={ref}
        bottomInset={verticalScale(props.bottomInset ?? 30)}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.headerAnims}>
              <Lottie
                style={styles.headerAnim}
                source={AnimsList[selectedServer]}
                autoPlay
                loop
              />
            </View>
            <View style={styles.headerText}>
              <View style={styles.headerInfo}>
                <Text style={styles.headerTitle}>{projectName}</Text>
                <View style={styles.HeaderPing}>
                  <NetworkSvg
                    style={styles.HeaderPingIcon}
                    width={verticalScale(10)}
                    height={verticalScale(10)}
                    fill={'#76d17f'}
                  />
                  <Text style={styles.HeaderPingText}>
                    {getRndInteger(20, 80)} ping
                  </Text>
                </View>
              </View>
              <Text style={styles.headerSubtitle}>{server?.name}</Text>
            </View>
          </View>
          <View style={styles.online}>
            {server?.loading && (
              <ActivityIndicator size="small" color="#719ff0" />
            )}
            {!server?.loading && server?.status && (
              <>
                <PeopleSvg
                  style={styles.onlineIcon}
                  width={verticalScale(17)}
                  height={verticalScale(17)}
                  fill={'#fff'}
                />
                <Text style={styles.onlineText}>
                  {server?.online ?? 40}
                  <Text style={styles.onlineTextPeople}>
                    {' '}
                    / {server?.slot ?? 100}
                  </Text>
                </Text>
              </>
            )}
            {!server?.loading && !server?.status && (
              <Text style={styles.onlineText}>
                <Text style={styles.online}>Недоступно</Text>
              </Text>
            )}
          </View>
          <View style={styles.event}>
            <Text style={styles.eventTitle}>События сервера:</Text>
            <View style={styles.eventContent}>
              {server?.events &&
                server?.events.map(el => (
                  <Event key={el.title} color={el.style}>
                    {el.title}
                  </Event>
                ))}

              {!server?.events?.length && (
                <Event color={'light'}>Нет активных событий</Event>
              )}
            </View>
          </View>
          <View style={styles.buttons}>
            <ButtonLauncher
              background="#2d7dbe"
              onPress={onPressPlayHandler}
              IconRight={PlaySvg}
              btnWidth={'100%'}>
              Подключиться
            </ButtonLauncher>
          </View>
        </View>
      </DetachedContent>
    );
  }),
);

const SheetServer = React.memo(SheetServerComponent);
SheetServer.displayName = 'SheetServer';

export default SheetServer;
