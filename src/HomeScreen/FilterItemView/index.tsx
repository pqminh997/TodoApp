import React from 'react';
import {Text, View, StyleSheet, Image, FlatList, Pressable} from 'react-native';
import {ColorItem} from '../../Utils/Types';
import {convertText} from '../../Utils/Util';

const iconRedStar = require('../../Assets/images/icon_red.png');
const iconOrangeStar = require('../../Assets/images/icon_orange.png');
const iconYellowStar = require('../../Assets/images/icon_yellow.png');
const iconStar = require('../../Assets/images/icon_star.png');
const iconAll = require('../../Assets/images/icon_all.png');

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
  isFilterType?: boolean;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={colors}
        renderItem={({item, index}) => {
          if (isFilterType || (!isFilterType && index !== 0)) {
            return (
              <ColorItemComponent
                item={item}
                index={index}
                onPress={onPressItem}
              />
            );
          } else {
            return <View />;
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
}: {
  item: ColorItem;
  index: number;
  onPress: (item: ColorItem) => void;
}) => {
  return (
    <Pressable
      style={[
        styles.colorItemBtn,
        index === colors.length - 1 && {paddingBottom: 10},
      ]}
      onPress={() => onPress(item)}>
      <Image
        source={item.image}
        style={{width: 18, height: 18, marginRight: 20}}
      />
      <Text>{convertText(item.name)}</Text>
    </Pressable>
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
