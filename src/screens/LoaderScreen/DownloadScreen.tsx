import KeepAwake from '@sayem314/react-native-keep-awake';
import React, { useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { verticalScale } from 'react-native-size-matters';
import { LoaderContainer } from '../../components/Provider/LoaderContainer';
import { formatSizeUnits } from '../../helpers';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectCompare,
  selectLoaderDownload,
} from '../../selectors/loaderSelectors';
import { styles } from '../../styles/LoaderStyle';
import { fetchStartDownload } from '../../thunks/loaderThunks';
const width = Dimensions.get('window').width;

export const DownloadScreen = React.memo(() => {
  const download = useAppSelector(selectLoaderDownload);
  const compare = useAppSelector(selectCompare);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStartDownload());
  }, []);

  const numberOfDownloads =
    compare.successCount + (download.numberOfDownloads || 0);

  let loaders = Math.floor(
    (((download.downloadBytes || 0) + compare.downloadsCacheBytes) * 100) /
      compare.distributionCacheBytes,
  );

  return (
    <LoaderContainer>
      <KeepAwake />
      <Text style={[styles.title, styles.titleUppercase]}>Загрузка игры</Text>
      <View>
        <Text style={styles.progressTitle}>
          <Text style={styles.progressName}>{download.fileName}</Text>
          <Text style={styles.progressMemory}>
            {' '}
            [{formatSizeUnits(download.currentBytes || 0)} из{' '}
            {formatSizeUnits(download.needBytes || 0)}]
          </Text>
        </Text>

        <Progress.Bar
          progress={loaders / 100 < 0.001 ? 0.0 : loaders / 100}
          animated={true}
          useNativeDriver={true}
          borderWidth={0}
          color={'#647fd3'}
          unfilledColor={'#2f3545'}
          borderRadius={20}
          height={10}
          width={width - verticalScale(40)}
        />

        <Text style={styles.progressSubtitle}>
          Загрузка файлов игры [{numberOfDownloads} из{' '}
          {compare.successCount + compare.rejectCount}]
        </Text>
        <Text style={styles.progressPercent}>{loaders > 0 ? loaders : 0}%</Text>
      </View>
    </LoaderContainer>
  );
});
