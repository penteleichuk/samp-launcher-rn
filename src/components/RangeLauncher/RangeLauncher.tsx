import { Slider } from '@sharcoux/slider';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './RangeLauncherStyle';

type RangeLauncherType = {
  title: string;
  minimumValue: number;
  maximumValue: number;
  range: number;
  onValueChange?: ((value: number) => void) | undefined;
  onSlidingComplete?: ((value: number) => void) | undefined;
};

export const RangeLauncher = React.memo((props: RangeLauncherType) => {
  const {
    title,
    minimumValue,
    maximumValue,
    range,
    onValueChange,
    onSlidingComplete,
  } = props;

  return (
    <>
      <View style={styles.range}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.body}>
          <Slider
            value={range} // set the current slider's value
            minimumValue={minimumValue} // Minimum value
            maximumValue={maximumValue} // Maximum value
            step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
            minimumTrackTintColor={'#575c9b7f'} // The track color before the current value
            maximumTrackTintColor={'#6570937f'} // The track color after the current value
            thumbTintColor={'#6b8afd'} // The color of the slider's thumb
            thumbStyle={{ paddingVertical: 10 }} // Override the thumb's style
            trackStyle={undefined} // Override the tracks' style
            minTrackStyle={undefined} // Override the tracks' style for the minimum range
            maxTrackStyle={undefined} // Override the tracks' style for the maximum range
            vertical={false} // If true, the slider will be drawn vertically
            inverted={false} // If true, min value will be on the right, and max on the left
            enabled={true} // If false, the slider won't respond to touches anymore
            trackHeight={10} // The track's height in pixel
            thumbSize={20} // The thumb's size in pixel
            slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
            onValueChange={onValueChange} // Called each time the value changed. The type is (value: number) => void
            onSlidingStart={undefined} // Called when the slider is pressed. The type is (value: number) => void
            onSlidingComplete={onSlidingComplete} // Called when the press is released. The type is (value: number) => void
          />
          <Text style={styles.number}>{Math.floor(range)}</Text>
        </View>
      </View>
    </>
  );
});
