import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectServers } from '../../selectors/serverSelectors';
import { selectSettingLocalhost } from '../../selectors/settingSelectors';
import { MonitoringEmpty } from './MonitoringEmpty';
import { MonitoringItem } from './MonitoringItem';
import { styles } from './MonitoringStyle';

type MonitoringType = {};

export const MonitoringComponent = React.memo(
  React.forwardRef<BottomSheetModal, MonitoringType>((props, ref) => {
    const servers = useAppSelector(selectServers);
    const localhost = useAppSelector(selectSettingLocalhost);

    const countServer = useMemo(() => {
      return servers.filter(el => el.show && !localhost).length === 1;
    }, [servers]);

    return (
      <View style={styles.monitoring}>
        <Text style={styles.title}>Выбор сервера</Text>
        <View style={styles.monitorings}>
          {servers.map(el => {
            return el.show || localhost ? (
              <MonitoringItem key={el.id} {...el} detachedServerRef={ref} />
            ) : null;
          })}
          {countServer && <MonitoringEmpty />}
        </View>
      </View>
    );
  }),
);

const Monitoring = React.memo(MonitoringComponent);
Monitoring.displayName = 'Monitoring';

export default Monitoring;
