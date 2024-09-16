import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TodoItem} from '../../Store';

const iconCheck = require('../../Assets/images/icon_check.png');
const iconDelete = require('../../Assets/images/icon_delete.png');

const iconRedStar = require('../../Assets/images/icon_red.png');
const iconGreenStar = require('../../Assets/images/icon_green.png');
const iconOrangeStar = require('../../Assets/images/icon_orange.png');
const iconYellowStar = require('../../Assets/images/icon_yellow.png');
const iconStar = require('../../Assets/images/icon_star.png');

const TodoItemView = ({
  item,
  onMarkAscomplete,
  onDeleteItem,
  onSelectItem,
}: {
  item: TodoItem;
  onMarkAscomplete: (item: TodoItem) => void;
  onDeleteItem: (item: TodoItem) => void;
  onSelectItem: (item: TodoItem) => void;
}) => {
  const [year, month, day] = item.expireDate.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  const getIcon = () => {
    switch (item.icon) {
      case 'all':
        return null;
      case 'red':
        return iconRedStar;
      case 'none':
        return iconGreenStar;
      case 'yellow':
        return iconYellowStar;
      case 'orange':
        return iconOrangeStar;
      default:
        return null;
    }
  };

  const formatDate = (formatDateTime: Date) => {
    const newDate = new Date(formatDateTime);

    const formattedTime = newDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const formattedDate = newDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return `${formattedTime} ${formattedDate}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.contentView]}
        onPress={() => onSelectItem(item)}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          hitSlop={{left: 20, right: 20}}
          onPress={() => onMarkAscomplete(item)}>
          {item.isSelected ? (
            <View style={[styles.checkBox, styles.checkDone]}>
              <Image source={iconCheck} style={styles.icon} />
            </View>
          ) : (
            <View style={styles.checkBox} />
          )}
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={[styles.textTitle, item.isSelected && styles.textTitleDone]}>
            {item.title}
          </Text>

          {item.desc && (
            <Text
              style={[styles.textDesc, item.isSelected && styles.textDescDone]}>
              {item.desc}
            </Text>
          )}

          {item.expireDate && (
            <Text
              style={[
                styles.textDesc,
                item.isSelected && styles.textDescDone,
                currentDate > targetDate &&
                  !item.isSelected &&
                  styles.expiryType,
              ]}>
              {`Due time: ${formatDate(new Date(item.expireDate))}`}
            </Text>
          )}
        </View>

        <View style={styles.rightViewContainer}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              marginLeft: 'auto',
              paddingRight: 20,
            }}
            hitSlop={{left: 20}}
            onPress={() => {}}>
            {getIcon() && (
              <Image source={getIcon()} style={styles.iconDelete} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={{right: 20}}
            style={{justifyContent: 'center', marginLeft: 'auto'}}
            onPress={() => onDeleteItem(item)}>
            <Image source={iconDelete} style={styles.iconDelete} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    minHeight: 60,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 10,
  },
  contentView: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  expiryType: {
    backgroundColor: '#fadbd8',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
  },
  checkDone: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: 14, height: 14},
  iconDelete: {width: 20, height: 20},
  textContainer: {justifyContent: 'center', marginLeft: 20, maxWidth: '70%', marginRight: 20},
  textTitleDone: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  textDescDone: {
    color: '#7f8c8d',
  },
  textTitle: {
    fontSize: 17,
  },
  textDesc: {
    fontSize: 12,
    color: '#787878',
  },
  rightViewContainer: {
    justifyContent: 'center',
    marginLeft: 'auto',
    flexDirection: 'row',
  },
});

export default TodoItemView;
