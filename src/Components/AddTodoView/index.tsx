import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import FilterItemView from '../../HomeScreen/FilterItemView';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getIcon} from '../../Utils/Util';
import styles from './styles';
import {ColorItem, TodoItem} from '../../Utils/Types';

const iconClock = require('../../Assets/images/icon_clock.png');
const iconDelete = require('../../Assets/images/icon_delete.png');
const iconCheck = require('../../Assets/images/icon_check.png');
const iconUnCheck = require('../../Assets/images/icon_un_check.png');

const AddTodoView = ({
  onAddTodoComplete,
  currentItem,
  onEditItem,
  onDeleteItem,
}: {
  onAddTodoComplete: (item: TodoItem) => void;
  currentItem?: TodoItem | null;
  onEditItem: (item: TodoItem) => void;
  onDeleteItem: (item: TodoItem) => void;
}) => {
  const [filterViewY, setFilterViewY] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const [showFilterView, setShowFilterView] = useState(false);
  const [todoItem, setTodoItem] = useState<TodoItem>(
    currentItem ?? {
      id: uuidv4(),
      title: '',
      desc: '',
      createDate: Date.now(),
      expireDate: undefined,
      isDone: false,
      icon: 'none',
    },
  );
  const [isShowDueTime, setIsShowDueTime] = useState(false);

  const dateTimePickerValue = todoItem.expireDate
    ? new Date(todoItem.expireDate)
    : new Date();

  const addNewTodo = () => {
    const expireDate = isShowDueTime ? todoItem.expireDate : undefined;
    const newTodo: TodoItem = {
      id: uuidv4(),
      title: todoItem.title,
      desc: todoItem.desc,
      createDate: Date.now(),
      expireDate,
      isDone: todoItem.isDone,
      icon: todoItem.icon,
    };
    if (currentItem) {
      const editTodo: TodoItem = {
        ...newTodo,
        id: currentItem.id,
        createDate: currentItem.createDate,
        isDone: todoItem.isDone,
      };
      onEditItem(editTodo);
    } else {
      onAddTodoComplete(newTodo);
    }
  };

  const onPressFilterItem = (item: ColorItem) => {
    setShowFilterView(false);
    setTodoItem({...todoItem, icon: item.name});
  };

  const onShowAlert = () => {
    Alert.alert(
      'Are you sure remove the task?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            currentItem && onDeleteItem(currentItem);
          },
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    if (currentItem) {
      currentItem.expireDate && setIsShowDueTime(true);
    } else {
      setIsShowDueTime(false);
    }
  }, [currentItem]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <View style={{marginVertical: 25}}>
          <TextInput
            style={styles.titleTxt}
            value={todoItem.title}
            placeholder="Todo name"
            onChangeText={text => setTodoItem({...todoItem, title: text})}
            ref={inputRef}
            autoCorrect={false}
            textContentType={'none'}
            autoComplete={'off'}
            spellCheck={false}
            placeholderTextColor={'gray'}
          />

          <TextInput
            autoCorrect={false}
            multiline={true}
            style={styles.descTxt}
            value={todoItem.desc}
            placeholder="Todo description"
            onChangeText={text => setTodoItem({...todoItem, desc: text})}
            spellCheck={false}
            autoComplete={'off'}
            placeholderTextColor={'gray'}
          />

          {isShowDueTime && (
            <View style={styles.dueTime}>
              <Text style={{fontSize: 18}}>{`Due time: `}</Text>

              <DateTimePicker
                mode="time"
                value={dateTimePickerValue}
                onChange={(event, time) => {
                  if (time) {
                    setTodoItem({...todoItem, expireDate: time.toString()});
                  }
                }}
              />

              <DateTimePicker
                mode="date"
                value={dateTimePickerValue}
                onChange={(event, date) => {
                  if (date) {
                    setTodoItem({...todoItem, expireDate: date.toString()});
                  }
                }}
              />
            </View>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            hitSlop={{right: 10}}
            style={[styles.bottomBtn, {paddingLeft: 12}]}
            onPress={addNewTodo}>
            <Text style={{fontSize: 22, color: '#3498db'}}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onLayout={event => {
              setFilterViewY(
                event.nativeEvent.layout.y + event.nativeEvent.layout.height,
              );
            }}
            style={[styles.bottomBtn, styles.item]}
            onPress={() => setShowFilterView(!showFilterView)}>
            <Image source={getIcon(todoItem.icon, true)} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomBtn, styles.item]}
            onPress={() => {
              setIsShowDueTime(!isShowDueTime);
            }}>
            <Image source={iconClock} style={styles.icon} />
          </TouchableOpacity>

          {currentItem && (
            <TouchableOpacity
              style={[styles.bottomBtn, styles.item]}
              onPress={() => {
                setTodoItem({...todoItem, isDone: !todoItem.isDone});
              }}>
              <Image
                source={todoItem.isDone ? iconCheck : iconUnCheck}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          )}
          {currentItem && <Text style={styles.separator}>|</Text>}

          {currentItem && (
            <TouchableOpacity
              style={[styles.bottomBtn, styles.item]}
              onPress={() => {
                onShowAlert();
              }}>
              <Image source={iconDelete} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>

        {showFilterView && (
          <View
            pointerEvents="auto"
            style={[
              styles.filterBottomView,
              {right: 0, bottom: filterViewY + 20},
            ]}>
            <FilterItemView onPressItem={onPressFilterItem} />
          </View>
        )}
      </View>
    </View>
  );
};

export default AddTodoView;
