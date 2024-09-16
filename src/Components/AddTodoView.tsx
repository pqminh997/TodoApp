import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {TodoIcon, TodoItem} from '../Store';
import FilterItemView, {ColorItem} from '../HomeScreen/FilterItemView';
import DateTimePicker from '@react-native-community/datetimepicker';

const iconAdd = require('../Assets/images/icon_add.png');
const iconClock = require('../Assets/images/icon_clock.png');
const iconClose = require('../Assets/images/icon_close.png');

const iconRedStar = require('../Assets/images/icon_red.png');
const iconGreenStar = require('../Assets/images/icon_green.png');
const iconOrangeStar = require('../Assets/images/icon_orange.png');
const iconYellowStar = require('../Assets/images/icon_yellow.png');
const iconStar = require('../Assets/images/icon_star.png');

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
  const [dueTime, setDueTime] = useState<string | null>('');
  const [currentIcon, setCurrentIcon] = useState<
    'red' | 'yellow' | 'none' | 'orange' | 'all'
  >('all');
  const [filterViewY, setFilterViewY] = useState(0);
  const [filterViewX, setFilterViewX] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const [showFilterView, setShowFilterView] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>(new Date());

  const [isShowDueTime, setIsShowDueTime] = useState(false);

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
    setShowFilterView(false);
    setCurrentIcon(item.name);
  };

  const getIcon = () => {
    switch (currentIcon) {
      case 'all':
        return iconStar;
      case 'red':
        return iconRedStar;
      case 'none':
        return iconGreenStar;
      case 'yellow':
        return iconYellowStar;
      case 'orange':
        return iconOrangeStar;
      default:
        return iconStar;
    }
  };

  useEffect(() => {
    if (currentItem) {
      setTitle(currentItem.title);
      setDesc(currentItem.desc);
      setDueTime(currentItem.expireDate);
      setCurrentIcon(currentItem.icon);

      if (currentItem.expireDate) {
        setIsShowDueTime(true);
      }
    }
  }, [currentItem]);

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
          />

          <TextInput
            // numberOfLines={6}
            multiline={true}
            style={{fontSize: 16, minHeight: 60, marginBottom: 0, color: '#787878'}}
            value={desc}
            placeholder="Todo description"
            onChangeText={text => setDesc(text)}
          />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {!isShowDueTime ? (
              <TouchableOpacity onPress={() => setIsShowDueTime(true)}>
                <Text
                  style={{
                    color: '#3498db',
                    fontWeight: '500',
                    paddingVertical: 10,
                  }}>
                  {'Set Due Time'}
                </Text>
              </TouchableOpacity>
            ) : (
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
                      setDueTime(time.toString());
                    }
                  }}
                />
                <TouchableOpacity
                  style={{marginLeft: 20}}
                  onPress={() => {
                    setIsShowDueTime(false);
                    setDueTime(null);
                  }}>
                  <Image source={iconClose} style={{width: 27, height: 27}} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row-reverse', marginBottom: 10}}>
          <TouchableOpacity
            hitSlop={{right: 20}}
            style={styles.addView}
            onPress={addNewTodo}>
            <Image source={iconAdd} style={{width: 24, height: 24}} />
          </TouchableOpacity>

          {/* <TouchableOpacity
            hitSlop={{right: 20}}
            style={[styles.addView, styles.clockView]}
            onPress={onShowCalendar}>
            <Image source={iconClock} style={{width: 24, height: 24}} />
          </TouchableOpacity> */}

          <TouchableOpacity
            onLayout={event => {
              setFilterViewY(
                event.nativeEvent.layout.y + event.nativeEvent.layout.height,
              );
              setFilterViewX(event.nativeEvent.layout.x);
            }}
            hitSlop={{right: 20}}
            style={[styles.addView, styles.starView]}
            onPress={() => setShowFilterView(!showFilterView)}>
            <Image source={getIcon()} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>

        {showFilterView && (
          <View
            style={[
              styles.filterBottomView,
              {left: filterViewX, bottom: filterViewY + 20},
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
  starView: {
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
});

export default AddTodoView;
