import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from 'react-native';
import {addTodo, TodoItem} from '../Store';
import {Calendar} from 'react-native-calendars';
import {useAppDispatch, useAppSelector} from '../Store/hook';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const iconAdd = require('../Assets/images/icon_add.png');
const iconClock = require('../Assets/images/icon_clock.png');

const AddTodoView = ({
  onComplete,
  currentItem,
  onEditItem,
}: {
  onComplete: (item: TodoItem) => void;
  currentItem?: TodoItem | null;
  onEditItem: (item: TodoItem) => void;
}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const onShowCalendar = () => {
    setIsShowCalendar(true);
  };

  const addNewTodo = () => {
    const newTodo: TodoItem = {
      id: uuidv4(),
      title,
      desc,
      createDate: Date.now(),
      expireDate: selectedDate,
      isSelected: false,
      isRedFlag: false,
    };
    if (currentItem) {
      const editTodo: TodoItem = {
        id: currentItem.id,
        title,
        desc,
        createDate: currentItem.createDate,
        expireDate: selectedDate,
        isSelected: currentItem.isSelected,
        isRedFlag: false,
      };
      onEditItem(editTodo);
    } else {
      onComplete(newTodo);
    }
  };

  useEffect(() => {
    if (isShowCalendar === false && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowCalendar]);

  useEffect(() => {
    if (currentItem) {
      setTitle(currentItem.title);
      setDesc(currentItem.desc);
      setSelectedDate(currentItem.expireDate);
    }
  }, [currentItem]);

  return (
    <View style={styles.container}>
      {isShowCalendar ? (
        <View style={{flex: 1, padding: 10}}>
          <Calendar
            onDayPress={day => {
              setSelectedDate(day.dateString);
              setIsShowCalendar(false);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <TextInput
            style={{fontSize: 16, height: 40}}
            value={title}
            placeholder="Todo name"
            onChangeText={text => setTitle(text)}
            ref={inputRef}
          />
          <TextInput
            style={{fontSize: 16, height: 40, marginBottom: 10}}
            value={desc}
            placeholder="Todo description"
            onChangeText={text => setDesc(text)}
          />
          {selectedDate && <Text>{`Expiry Date: ${selectedDate}`}</Text>}

          <View style={{flexDirection: 'row-reverse', marginBottom: 10}}>
            <TouchableOpacity style={styles.addView} onPress={addNewTodo}>
              <Image source={iconAdd} style={{width: 24, height: 24}} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addView, styles.clockView]}
              onPress={onShowCalendar}>
              <Image source={iconClock} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addView: {
    width: 40,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  clockView: {
    backgroundColor: 'white',
  },
});

export default AddTodoView;
