import {IconType} from './Types';

const iconRedStar = require('../Assets/images/icon_red.png');
const iconOrangeStar = require('../Assets/images/icon_orange.png');
const iconYellowStar = require('../Assets/images/icon_yellow.png');
const iconStar = require('../Assets/images/icon_star.png');

export const convertText = (item: IconType) => {
  switch (item) {
    case 'all':
      return 'All';
    case 'none':
      return 'None';
    case 'red':
      return 'High';
    case 'yellow':
      return 'Low';
    case 'orange':
      return 'Medium';
    default:
      return 'None';
  }
};

export const getIcon = (icon: IconType, isAddView: boolean = false) => {
  switch (icon) {
    case 'all':
      return null;
    case 'red':
      return iconRedStar;
    case 'none':
      return isAddView ? iconStar : null;
    case 'yellow':
      return iconYellowStar;
    case 'orange':
      return iconOrangeStar;
    default:
      return null;
  }
};
