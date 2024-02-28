import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { Cards } from '../components/Card/Cards';
import Monitoring from '../components/Monitoring/Monitoring';
import { MainContainer } from '../components/Provider/MainContainer';
import SheetServer from '../components/Sheet/SheetServer/SheetServer';

export const GameScreen = React.memo(() => {
  const detachedServerRef = useRef<BottomSheetModal>(null);

  return (
    <MainContainer paddingHorizontal={0}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Cards />
        <Monitoring ref={detachedServerRef} />
        <SheetServer ref={detachedServerRef} bottomInset={60} />
      </ScrollView>
    </MainContainer>
  );
});
