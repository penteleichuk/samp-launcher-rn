import { LINK_DISCORD, LINK_SITE, LINK_TIKTOK, LINK_VK } from '@env';
import React, { useCallback } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  discordLinkIcon,
  logoLinkIcon,
  tiktokLinkIcon,
  vkLinkIcon,
} from './../../assets/icons';
import { styles } from './SocialStyle';

export const socials = [
  {
    title: 'Сайт',
    link: LINK_SITE,
    icon: logoLinkIcon,
  },
  {
    title: 'VK',
    link: LINK_VK,
    icon: vkLinkIcon,
  },
  {
    title: 'Discrod',
    link: LINK_DISCORD,
    icon: discordLinkIcon,
  },
  {
    title: 'TikTok',
    link: LINK_TIKTOK,
    icon: tiktokLinkIcon,
  },
];

export const Social = React.memo(() => {
  const onPressLinkHandler = useCallback(async (link: string) => {
    await Linking.openURL(link);
  }, []);

  return (
    <View style={styles.social}>
      <Text style={styles.title}>Социальные сети</Text>
      <View style={styles.body}>
        {socials.map((el, key) => (
          <LinearGradient
            key={el.title}
            style={[
              styles.case,
              key === socials.length - 1 ? { marginRight: 0 } : null,
            ]}
            start={{ x: 0.0, y: 0.0 }}
            colors={['#de73c526', '#4851a200']}>
            <TouchableOpacity
              style={styles.link}
              onPress={() => onPressLinkHandler(el.link)}>
              <Image style={styles.image} source={el.icon} />
              <Text style={styles.subtitle}>{el.title}</Text>
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
});
