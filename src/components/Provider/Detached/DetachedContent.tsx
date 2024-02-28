import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BlurView } from '@react-native-community/blur';
import React, { useCallback, useMemo } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './DetachedContentStyle';

type DetachedContentProps = {
  children: React.ReactNode;
  bottomInset?: number;
  name: string;
};

const DetachedContentComponent = React.memo(
  React.forwardRef<BottomSheetModal, DetachedContentProps>((props, ref) => {
    const { children, bottomInset = 0, name } = props;

    const { dismiss } = useBottomSheetModal();
    const { bottom: safeBottomArea } = useSafeAreaInsets();

    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const contentContainerStyle = useMemo(
      () => [
        styles.contentContainerStyle,
        { paddingBottom: safeBottomArea || 10 },
      ],
      [safeBottomArea],
    );

    const {
      handleContentLayout,
      animatedSnapPoints,
      animatedHandleHeight,
      animatedContentHeight,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const onCloseBackdrop = useCallback(() => {
      dismiss(props.name);
    }, [props.name]);

    const renderBackdrop = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          opacity={1.3}
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          // pressBehavior={'close'}
          enableTouchThrough={false}
          onPress={onCloseBackdrop}>
          <BlurView
            style={styles.blur}
            blurType="dark"
            blurAmount={20}
            reducedTransparencyFallbackColor={'dark'}
          />
          {/* <Pressable style={styles.flex} /> */}
        </BottomSheetBackdrop>
      ),
      [],
    );

    const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
      style,
    }) => {
      const containerStyle = useMemo(
        () => [style, styles.customBackground],
        [style],
      );

      return <Animated.View style={[containerStyle]} />;
    };

    return (
      <BottomSheetModal
        ref={ref}
        name={name}
        enablePanDownToClose={true}
        animateOnMount={true}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={renderBackdrop}
        backgroundComponent={CustomBackground}
        bottomInset={bottomInset}
        detached={true}>
        <BottomSheetView
          style={[contentContainerStyle]}
          onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }),
);

const DetachedContent = React.memo(DetachedContentComponent);
DetachedContent.displayName = 'DetachedContent';

export default DetachedContent;
