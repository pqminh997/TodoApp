import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {getIcon} from '../../Utils/Util';
import styles from './styles';
import { TodoItem } from '../../Utils/Types';

const TodoItemView = ({
  item,
  onSelectItem,
}: {
  item: TodoItem;
  onSelectItem: (item: TodoItem) => void;
}) => {
  const expireDate = item.expireDate && new Date(item.expireDate).getTime();
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
          <Text style={[styles.textTitle, item.isDone && styles.textTitleDone]}>
            {item.title}
          </Text>

          {item.desc && (
            <Text
              numberOfLines={2}
              style={[styles.textDesc, item.isDone && styles.textDescDone]}>
              {item.desc}
            </Text>
          )}

          {expireDate && (
            <Text
              style={[
                styles.textDueTime,
                item.isDone && styles.textDescDone,
                currentDate > expireDate && !item.isDone && styles.expiryType,
              ]}>
              {`Due time: ${formatDate(new Date(expireDate))}`}
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



export default TodoItemView;
