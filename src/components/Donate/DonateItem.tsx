import { LINK_DONATE, LINK_SITE_STORAGE } from '@env';
import React, { useCallback } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { DonateType } from '../../services/donate.service';
import { styles } from './DonateItemStyle';

const exclusives = [
  {
    msg: 'Популярно',
    style: 'badge-success',
  },
  {
    msg: 'Акция',
    style: 'badge-danger',
  },
  {
    msg: 'Эксклюзив',
    style: 'badge-info',
  },
  {
    msg: 'Супер акция',
    style: 'badge-info',
  },
];

type DonateItemType = DonateType & {
  index: number;
  last: number;
};

export const DonateItem = React.memo((props: DonateItemType) => {
  const { title, last, price_scont, price, image, index, tag } = props;

  const donateHandler = useCallback(async () => {
    await Linking.openURL(LINK_DONATE);
  }, []);

  return (
    <LinearGradient
      style={[
        styles.donate,
        index % 2 ? styles.gapRight : styles.gapLeft,
        last === index ? styles.gapNone : null,
      ]}
      start={{ x: 0.0, y: 0.0 }}
      colors={['#a495dcc9', '#3c2c5a00']}>
      {tag > 0 && (
        <Text
          style={[styles.badge, styles[exclusives[tag].style.split('-')[1]]]}>
          {' '}
          {exclusives[tag].msg}
        </Text>
      )}

      <View style={styles.proster}>
        <View style={styles.images}>
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: `${LINK_SITE_STORAGE}${image}`,
              priority: FastImage.priority.normal,
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles['name']}>
          {title}
        </Text>
        <View style={styles.link}>
          <TouchableOpacity style={{ width: '100%' }} onPress={donateHandler}>
            {price_scont ? (
              <Text style={styles.price}>
                {price_scont}₽ <Text style={styles.scont}>{price}₽</Text>
              </Text>
            ) : (
              <Text style={styles.price}>{price} ₽</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
});
