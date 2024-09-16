import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const iconRedStar = require('../../Assets/images/icon_red.png');
const iconGreenStar = require('../../Assets/images/icon_green.png');
const iconOrangeStar = require('../../Assets/images/icon_orange.png');
const iconYellowStar = require('../../Assets/images/icon_yellow.png');
const iconStar = require('../../Assets/images/icon_star.png');
const iconAll = require('../../Assets/images/icon_all.png');

export interface ColorItem {
  name: 'red' | 'yellow' | 'none' | 'orange' | 'all';
  image: any;
}

const colors: ColorItem[] = [
  {name: 'all', image: iconAll},
  {name: 'red', image: iconRedStar},
  {name: 'orange', image: iconOrangeStar},
  {name: 'yellow', image: iconYellowStar},
  {name: 'none', image: iconStar},
];

const FilterItemView = ({
  onPressItem,
  isFilterType = false,
}: {
  onPressItem: (item: ColorItem) => void;
  isFilterType: boolean;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={colors}
        renderItem={({item, index}) => {
          if (isFilterType) {
            return (
              <ColorItemComponent
                item={item}
                index={index}
                onPress={onPressItem}
                isFilterType={isFilterType}
              />
            );
          } else {
            if (index !== 0) {
              return (
                <ColorItemComponent
                  item={item}
                  index={index}
                  onPress={onPressItem}
                  isFilterType={isFilterType}
                />
              );
            } else {
              return <View />;
            }
          }
        }}
        keyExtractor={item => item.name}
        extraData={colors}
        scrollEnabled={false}
      />
    </View>
  );
};

const ColorItemComponent = ({
  item,
  index,
  onPress,
  isFilterType,
}: {
  item: ColorItem;
  index: number;
  onPress: (item: ColorItem) => void;
  isFilterType: boolean;
}) => {
  // const [text, setText] = useState<string>('all');

  const convertText = () => {
    switch (item.name) {
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

  return (
    <TouchableOpacity
      style={[
        styles.colorItemBtn,
        index === colors.length - 1 && {paddingBottom: 10},
      ]}
      onPress={() => onPress(item)}>
      <Image
        source={item.image}
        style={{width: 18, height: 18, marginRight: 20}}
      />
      <Text>{convertText()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  colorItemBtn: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 20,
    overflow: 'visible',
  },
  container: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderRadius: 10,
  },
});

export default FilterItemView;
