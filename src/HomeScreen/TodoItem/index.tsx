import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TodoItem} from '../../Store';
import {getIcon} from '../../Utils/Util';

const iconCheck = require('../../Assets/images/icon_check.png');
const iconDelete = require('../../Assets/images/icon_delete.png');

const TodoItemView = ({
  item,
  onSelectItem,
}: {
  item: TodoItem;
  onSelectItem: (item: TodoItem) => void;
}) => {
  const expireDate = new Date(item.expireDate).getTime();
  const currentDate = new Date().getTime();

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
        <View style={styles.textContainer}>
          <Text
            style={[styles.textTitle, item.isSelected && styles.textTitleDone]}>
            {item.title}
          </Text>

          {item.desc && (
            <Text
              numberOfLines={2}
              style={[styles.textDesc, item.isSelected && styles.textDescDone]}>
              {item.desc}
            </Text>
          )}

          {item.expireDate && (
            <Text
              style={[
                styles.textDueTime,
                item.isSelected && styles.textDescDone,
                currentDate > expireDate &&
                  !item.isSelected &&
                  styles.expiryType,
              ]}>
              {`Due time: ${formatDate(new Date(item.expireDate))}`}
            </Text>
          )}
        </View>

        <View style={styles.rightViewContainer}>
          {getIcon(item.icon) && (
            <Image source={getIcon(item.icon)} style={styles.iconDelete} />
          )}
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
  },
  contentView: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: 10,
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
  textContainer: {
    justifyContent: 'center',
    maxWidth: '90%',
    marginRight: 20,
  },
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
  textDueTime: {
    marginTop: 6,
    fontSize: 12,
    color: '#787878',
  },
  rightViewContainer: {
    justifyContent: 'center',
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TodoItemView;
