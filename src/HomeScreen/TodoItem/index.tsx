import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TodoItem} from '../../Store';

const iconCheck = require('../../Assets/images/icon_check.png');
const iconRedFlag = require('../../Assets/images/icon_red_flag.png');
const iconDelete = require('../../Assets/images/icon_delete.png');
const iconBlackFlag = require('../../Assets/images/icon_black_flag.png');

const TodoItemView = ({
  item,
  onMarkAscomplete,
  onDeleteItem,
  onSelectItem,
  onSetRedFlagTodo,
}: {
  item: TodoItem;
  onMarkAscomplete: (item: TodoItem) => void;
  onDeleteItem: (item: TodoItem) => void;
  onSelectItem: (item: TodoItem) => void;
  onSetRedFlagTodo: (item: TodoItem) => void;
}) => {
  const [year, month, day] = item.expireDate.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  const currentDate = new Date();

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
              {`Expiry Date: ${item.expireDate}`}
            </Text>
          )}
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginLeft: 'auto',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              marginLeft: 'auto',
              paddingRight: 20,
            }}
            hitSlop={{left: 20}}
            onPress={() => {
              onSetRedFlagTodo(item);
            }}>
            <Image
              source={item.isRedFlag ? iconRedFlag : iconBlackFlag}
              style={styles.iconDelete}
            />
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
    height: 60,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 10,
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
  textContainer: {justifyContent: 'center', marginLeft: 20},
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
  },
});

export default TodoItemView;
