import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {TodoItem} from '../Store';
import FilterItemView, {ColorItem} from '../HomeScreen/FilterItemView';
import DateTimePicker from '@react-native-community/datetimepicker';
import {IconType} from '../Utils/Types';
import {getIcon} from '../Utils/Util';

const iconAdd = require('../Assets/images/icon_add.png');
const iconClock = require('../Assets/images/icon_clock.png');
const iconDelete = require('../Assets/images/icon_delete.png');
const iconCheck = require('../Assets/images/icon_check.png');
const iconUnCheck = require('../Assets/images/icon_un_check.png');

const AddTodoView = ({
  onComplete,
  currentItem,
  onEditItem,
  onDeleteItem,
  onMarkAscomplete,
}: {
  onComplete: (item: TodoItem) => void;
  currentItem?: TodoItem | null;
  onEditItem: (item: TodoItem) => void;
  onDeleteItem: (item: TodoItem) => void;
  onMarkAscomplete: (item: TodoItem) => void;
}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueTime, setDueTime] = useState<string | null>('');
  const [currentIcon, setCurrentIcon] = useState<IconType>('none');
  const [filterViewY, setFilterViewY] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const [showFilterView, setShowFilterView] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>(new Date());

  const [isShowDueTime, setIsShowDueTime] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const addNewTodo = () => {
    const newTodo: TodoItem = {
      id: uuidv4(),
      title,
      desc,
      createDate: Date.now(),
      expireDate: dueTime ?? '',
      isSelected: false,
      icon: currentIcon,
    };
    if (currentItem) {
      const editTodo: TodoItem = {
        id: currentItem.id,
        title,
        desc,
        createDate: currentItem.createDate,
        expireDate: dueTime ?? '',
        isSelected: currentItem.isSelected,
        icon: currentIcon,
      };
      onEditItem(editTodo);
    } else {
      onComplete(newTodo);
    }
  };

  const onPressFilterItem = (item: ColorItem) => {
    console.log('awdawd');
    setShowFilterView(false);
    setCurrentIcon(item.name);
  };

  const onShowAlert = () => {
    Alert.alert(
      'Are you sure remove the task?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
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
      setTitle(currentItem.title);
      setDesc(currentItem.desc);
      setCurrentIcon(currentItem.icon);
      setIsDone(currentItem.isSelected);
      if (currentItem.expireDate) {
        setIsShowDueTime(true);
        setDueTime(currentItem.expireDate);
        setTime(new Date(currentItem.expireDate));
        setDate(new Date(currentItem.expireDate));
      } else {
        setDueTime(new Date().toString());
      }
    } else {
      setIsShowDueTime(false);
      setDueTime(null);
    }
  }, [currentItem]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginHorizontal: 20}}>
        <View style={{marginVertical: 25}}>
          <TextInput
            style={{fontSize: 16, height: 40}}
            value={title}
            placeholder="Todo name"
            onChangeText={text => setTitle(text)}
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
            style={{
              fontSize: 16,
              minHeight: 40,
              marginBottom: 0,
              color: '#787878',
            }}
            value={desc}
            placeholder="Todo description"
            onChangeText={text => setDesc(text)}
            spellCheck={false}
            autoComplete={'off'}
            placeholderTextColor={'gray'}
          />

          {isShowDueTime && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 18}}>{`Due time: `}</Text>

              <DateTimePicker
                mode="time"
                value={time}
                onChange={(event, time) => {
                  if (time) {
                    setDueTime(time.toString());
                    setTime(time);
                  }
                }}
              />

              <DateTimePicker
                mode="date"
                value={date}
                onChange={(event, date) => {
                  if (date) {
                    setDate(date);
                    setDueTime(date.toString());
                  }
                }}
              />
            </View>
          )}
        </View>

        <View style={{flexDirection: 'row-reverse', marginBottom: 10}}>
          <TouchableOpacity
            hitSlop={{right: 10}}
            style={[styles.addView]}
            onPress={addNewTodo}>
            {/* <Image source={iconAdd} style={{width: 24, height: 24}} /> */}
            <Text style={{fontSize: 24, color: '#3498db'}}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onLayout={event => {
              setFilterViewY(
                event.nativeEvent.layout.y + event.nativeEvent.layout.height,
              );
            }}
            hitSlop={{right: 10}}
            style={[styles.addView, styles.starView]}
            onPress={() => setShowFilterView(!showFilterView)}>
            <Image
              source={getIcon(currentIcon, true)}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={{right: 10}}
            style={[styles.addView, styles.clockView]}
            onPress={() => {
              setIsShowDueTime(!isShowDueTime);
            }}>
            <Image source={iconClock} style={{width: 24, height: 24}} />
          </TouchableOpacity>

          {currentItem && (
            <TouchableOpacity
              hitSlop={{left: 10, right: 5}}
              style={{}}
              onPress={() => {
                currentItem && onMarkAscomplete(currentItem);
                setIsDone(!isDone);
              }}>
              <Image
                source={isDone ? iconCheck : iconUnCheck}
                style={{width: 38, height: 38}}
              />
            </TouchableOpacity>
          )}
          {currentItem && <Text style={styles.deleteView}>|</Text>}

          {currentItem && (
            <TouchableOpacity
              hitSlop={{right: 10}}
              style={[styles.addView, styles.clockView]}
              onPress={() => {
                onShowAlert();
              }}>
              <Image source={iconDelete} style={{width: 24, height: 24}} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  clockView: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
  },
  starView: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
  },
  filterView: {
    position: 'absolute',
    alignSelf: 'center',
  },
  filterBottomView: {
    position: 'absolute',
    alignSelf: 'center',
  },
  deleteView: {
    fontSize: 30,
    color: 'gray',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
});

export default AddTodoView;
