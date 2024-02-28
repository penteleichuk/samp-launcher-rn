import { verticalScale } from 'react-native-size-matters';
import { DonateCategoriesType, DonateType } from '../services/donate.service';

type FormatDonate = {
  title: string;
  items: DonateType[];
  sizeSnapToInterval?: number[] | undefined;
};

// Формирование доната
export const generateDonate = (
  donates: DonateType[],
  categories: DonateCategoriesType[],
  width: number,
): FormatDonate[] => {
  let data: FormatDonate[] = [];
  categories.forEach(element => {
    const getItems = [...donates.filter(e => element.id === e.category_id)];

    if (element.published) {
      data = [
        ...data,
        {
          title: element.title,
          items: getItems,
          sizeSnapToInterval: getItems.map((x, i) => {
            return i * (width - verticalScale(50));
          }),
        },
      ];
    }
  });

  return data;
};

// Формирование доната
export const getDonate = (
  donates: DonateType[],
  categoryId: number,
): DonateType[] => {
  switch (categoryId) {
    case 1: {
      return donates.filter(e => e.category_id === 1 || e.category_id === 2);
    }
    case 2: {
      return donates.filter(e => e.category_id === 6 || e.category_id === 7);
    }
    case 3: {
      return donates.filter(e => e.category_id === 3 || e.category_id === 5);
    }
    case 4: {
      return donates.filter(e => e.category_id === 4);
    }
  }

  return donates.filter(e => e.category_id === categoryId);
};

export const listDonates = (donates: DonateType[]): DonateType[] => {
  return donates.flat();
};
