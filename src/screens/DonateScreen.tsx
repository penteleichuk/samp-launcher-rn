import React, { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { MainContainer, Social } from '../components';
import { DonateItem } from '../components/Donate/DonateItem';
import { listDonates } from '../features/generateDonate';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectDonates } from '../selectors/danateSelectors';
import { styles } from './../styles/DonateStyle';

export const DonateScreen = React.memo(() => {
  const donates = useAppSelector(selectDonates);

  const donateMemo = useMemo(() => {
    return listDonates(donates);
  }, [donates]);

  return (
    <MainContainer>
      <Social />
      <View style={styles.donate}>
        {donateMemo.length > 0 && (
          <FlatList
            ListHeaderComponent={<Text style={styles.title}>Донат услуги</Text>}
            contentContainerStyle={{ paddingBottom: verticalScale(20) }}
            data={donateMemo}
            numColumns={2}
            renderItem={el => (
              <DonateItem
                key={el.index}
                last={donateMemo.length - 1}
                index={el.index}
                {...el.item}
              />
            )}
          />
        )}
      </View>
    </MainContainer>
  );
});
