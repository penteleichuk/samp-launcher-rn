import { LINK_SITE_NEWS, LINK_SITE_STORAGE } from '@env';
import React, { useCallback } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { NoImage } from '../../../assets/images';
import { substringStr } from '../../../features/substring-str';
import { ArticleType } from '../../../services/article.service';
import { styles } from './CardItemStyles';

export const CardItem = (article: ArticleType) => {
  const onPressArticleHandler = useCallback(async (link: string) => {
    await Linking.openURL(`${LINK_SITE_NEWS}view/${link}`);
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.cover}>
        {article.image !== '' && (
          <FastImage
            style={[styles.image]}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: `${LINK_SITE_STORAGE}${article.image}`,
              priority: FastImage.priority.normal,
            }}
          />
        )}
        {article.image === '' && (
          <Image source={NoImage} style={[styles.image]} />
        )}
      </View>
      <LinearGradient
        style={styles.content}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.2 }}
        colors={['#00000000', '#000000ff']}>
        <TouchableOpacity onPress={() => onPressArticleHandler(article.slug)}>
          <Text style={styles.title}>{substringStr(article.title, 40)}</Text>
          <Text style={styles.created}>{article.created_at}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
